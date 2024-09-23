import React from 'react';
import './index.css';

const PrivacyNotice = () => {
  return (
    <div className="privacy-notice">
      <h1>Privacy Notice</h1>
      <div className="content">
        <p>
          On May 25th, 2018, the EU General Data Protection Regulation (GDPR) replaced the 1995 EU Data Protection Directive, followed by the California Consumer Privacy Act (CCPA) taking effect on January 1, 2020. Subsequently, on January 1, 2023, the California Privacy Rights Act (CPRA) was enacted, which extends and enhances the CCPA. Google pledges support for its customers' compliance with these regulations, whether they are large enterprises or individual developers.
        </p>
        <p>
          Under GDPR, Google typically operates as a data processor, while under CCPA/CPRA, it functions as a service provider. This means that data control lies with the customer, who bears responsibilities such as upholding individuals' rights regarding their personal data.
        </p>
        <p>
          Firebase, a Google service, acts as a data processor/service provider for customers' personal data or information. The Firebase terms include Data Processing and Security Terms, outlining these roles and responsibilities. Additionally, certain Firebase services are governed by the Google Cloud Platform (GCP) Terms of Service, covered by the Cloud Data Processing Addendum.
        </p>
        <p>
          Firebase services adhere to major privacy and security standards, including ISO and SOC compliance. They have certifications such as ISO 27001, SOC 1, SOC 2, SOC 3, ISO 27017, and ISO 27018. Firebase has transitioned from the EU-U.S. Privacy Shield to Standard Contractual Clauses for relevant data transfers, complying with GDPR requirements post the EU Court of Justice ruling. The latest versions of Standard Contractual Clauses, approved by the European Commission on June 4, 2021, are integrated into contracts with Firebase customers for relevant data transfers, ensuring lawful data transfer mechanisms in accordance with applicable data protection laws.
        </p>
        <p>
          The General Data Protection Regulation (Regulation (EU) 2016/679) ('GDPR') came into effect on 25 May 2018, and governs the protection of personal data in EU and EEA Member States. The Data Privacy Act of 2012 (Republic Act No. 10173) ('the Act') came into force on 8 September 2012 and is the first comprehensive law covering data privacy in the Philippines. The National Privacy Commission ('NPC'), which was established in early 2016 as the authority in charge of enforcing the Act, later issued the Implementing Rules and Regulations of Republic Act No. 10173 ('the IRRs'). The IRRs provide, in greater detail, the requirements that individuals and entities must comply with when processing personal data.
        </p>
        <p>
          In general terms, both the GDPR and the Act set out similar approaches in terms of data subjects rights, principles of accountability, and obligations relating to data security, breach notifications, and the protection of privacy. Furthermore, the Act provides the NPC with similar responsibilities, as well as corrective and investigative powers, as the data protection authorities under the GDPR. However, the Act and the GDPR differ in some respects, including with regards to pseudonymization, the protection of children's rights, data processing for research purposes, data transfers, as well as requirements for Data Protection Impact Assessments ('DPIAs').
        </p>
        <p>
          Article 4(1) of the GDPR: 'personal data' means any information relating to an identified or identifiable natural person ('data subject'); an identifiable natural person is one who can be identified, directly or indirectly, in particular by reference to an identifier such as a name, an identification number, location data, an online identifier or to one or more factors specific to the physical, physiological, genetic, mental, economic, cultural or social identity of that natural person.
        </p>
        <p>
          Article 4(2) of the GDPR: 'processing' means any operation or set of operations which is performed on personal data or on sets of personal data, whether or not by automated means, such as collection, recording, organization, structuring, storage, adaptation or alteration, retrieval, consultation, use, disclosure by transmission, dissemination or otherwise making available, alignment or combination, restriction, erasure or destruction.
        </p>
        <p>
          Article 9(1) of the GDPR: processing of personal data revealing racial or ethnic origin, political opinions, religious or philosophical beliefs, or trade union membership, and the processing of genetic data, biometric data for the purpose of uniquely identifying a natural person, data concerning health or data concerning a natural person's sex life or sexual orientation shall be prohibited.
        </p>
        <p>
          Sections 3(g) of the Act and 3(l) of the IRRs: 'personal information' refers to any information whether recorded in a material form or not, from which the identity of an individual is apparent or can be reasonably and directly ascertained by the entity holding the information, or when put together with other information would directly and certainly identify an individual.
        </p>
        <p>
          Section 3(j) of the Act: 'processing' refers to any operation or any set of operations performed upon personal information including, but not limited to, the collection, recording, organization, storage, updating or modification, retrieval, consultation, use, consolidation, blocking, erasure or destruction of data.
        </p>
        <p>
          Section 3(o) of the IRRs: Processing may be performed through automated means, or manual processing, if the personal data are contained or are intended to be contained in a filing system.
        </p>
        <p>
          Sections 3(l) of the Act and 3(t) of the IRRs: 'sensitive personal information' refers to personal information: (1) About an individual's race, ethnic origin, marital status, age, colour, and religious, philosophical, or political affiliations; (2) About an individual's health, education, genetic or sexual life of a person, or to any proceeding for any offence committed or alleged to have been committed by such person, the disposal of such proceedings, or the sentence of any court in such proceedings;
        </p>
      </div>
    </div>
  );
};

export default PrivacyNotice;
