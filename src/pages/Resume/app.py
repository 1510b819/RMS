import sys
import docx2txt
import nltk
import re
from pdfminer.high_level import extract_text
import os
import spacy
import json
from Skills_DB import SKILLS_DB
from Education_Pattern import EDUCATION_PATTERNS
from Courses import COURSES

# Pre-download only if necessary to avoid repetitive downloads
nltk.download('punkt', quiet=True)
nltk.download('stopwords', quiet=True)

# Use the small version of spacy for performance reasons
nlp = spacy.load('en_core_web_sm', disable=['parser', 'tagger', 'lemmatizer'])

# Regex patterns
PHONE_REG = re.compile(r'[\+\(]?[1-9][0-9 .\-\(\)]{8,}[0-9]')
EMAIL_REG = re.compile(r'[a-z0-9\.\-+_]+@[a-z0-9\.\-+_]+\.[a-z]+')

def extract_text_from_docx(docx_path):
    if not os.path.exists(docx_path):
        raise FileNotFoundError(f"File '{docx_path}' not found")
    return docx2txt.process(docx_path).replace('\t', ' ')

def extract_education(input_text):
    education = {match for pattern in EDUCATION_PATTERNS for match in re.findall(pattern, input_text, re.IGNORECASE)}
    closest_course, max_matches = max(((course, len(education.intersection(keywords))) for course, keywords in COURSES.items()), key=lambda x: x[1], default=(None, 0))
    return closest_course, education

def extract_phone_number(resume_text):
    phone = re.findall(PHONE_REG, resume_text)
    return phone[0] if phone and len(phone[0]) < 16 else None

def extract_text_from_pdf(pdf_path):
    if not os.path.exists(pdf_path):
        raise FileNotFoundError(f"File '{pdf_path}' not found")
    return extract_text(pdf_path)

def extract_emails(resume_text):
    return re.findall(EMAIL_REG, resume_text)

def extract_skills(input_text):
    stop_words = set(nltk.corpus.stopwords.words('english'))
    word_tokens = [w for w in nltk.tokenize.word_tokenize(input_text) if w.isalpha() and w.lower() not in stop_words]
    bigrams_trigrams = [' '.join(gram) for gram in nltk.everygrams(word_tokens, 2, 3)]
    found_skills = {token.lower() for token in word_tokens if token.lower() in SKILLS_DB}
    found_skills.update(ngram.lower() for ngram in bigrams_trigrams if ngram.lower() in SKILLS_DB)
    return found_skills

def extract_names(txt):
    person_names = [ent.text.strip().split('\n')[0] for ent in nlp(txt).ents if ent.label_ == 'PERSON' and any(char.isalpha() for char in ent.text)]
    return person_names[:1]  # Return the first found name, or empty if none

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Error: Please provide the file path of the PDF or DOCX file.")
        sys.exit(1)

    file_path = sys.argv[1]

    try:
        text = extract_text_from_docx(file_path) if file_path.endswith('.docx') else extract_text_from_pdf(file_path)
    except FileNotFoundError as e:
        print(f"Error: {e}")
        sys.exit(1)

    if text:
        names = extract_names(text)
        degree, education_keywords = extract_education(text)
        skills = extract_skills(text)
        phone_number = extract_phone_number(text)
        emails = extract_emails(text)

        output_data = {
            "Names": names,
            "Education": {
                "Degree": degree,
                "Keywords": list(education_keywords)
            },
            "Skills": list(skills),
            "Phone Number": phone_number,
            "Emails": emails
        }

        print(json.dumps(output_data, indent=4))
