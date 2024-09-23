import React from "react";
import { Helmet } from "react-helmet";
import { Text, Img, Heading, Button } from "../../components";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import stilogo from '../stilogo.png'

export default function MainPage() {
  return (
    <>
      <Helmet>
        <title>Careers - Join Our Team | Applicant Tracking System</title>
        <meta
          name="description"
          content="Explore career opportunities with our Applicant Tracking System. Sign up to submit your resume and learn more about our hiring process. Contact recruitment@laspinas.sti.edu.ph for support."
        />
      </Helmet>

      {/* main layout section */}
      <div className="relative w-full bg-gray-50">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        
        <div className="relative z-20">
          <div className="flex flex-col items-center gap-[75px] md:gap-14 sm:gap-[37px]">
            {/* header section */}
            <div className="flex h-[802px] items-start self-stretch bg-[url(/public/images/img_header.png)] bg-cover bg-no-repeat py-5 md:h-auto md:flex-col">
              <Img
                src={stilogo}
                alt="imageone_one"
                className="mb-[649px] h-[111px] w-[13%] object-cover md:w-full"
              />
              <header className="mt-[22px] flex flex-1 items-center bg-light_blue-800 p-2.5 md:self-stretch md:p-5">
                <div className="flex w-[86%] items-center justify-between gap-5 self-end md:w-full md:flex-col">
                  <Text size="4xl" as="p" className="self-start !text-white-A700">
                    Applicant Tracking System
                  </Text>
                  <div className="flex w-[34%] items-center justify-center gap-5 md:w-full">
                    <div className="flex self-start">
                      <Text size="4xl" as="p" className="!text-white-A700">
                        FAQ
                      </Text>
                    </div>
                    <Link to="/register">
                      <div className="flex self-start">
                        <Text size="4xl" as="p" className="!text-white-A700">
                          Sign Up
                        </Text>
                      </div>
                    </Link>
                    <Link to="/login"> 
                      <Button
                        color="white_A700"
                        size="xl"
                        className="min-w-[131px] rounded-[20px] !text-light_blue-800 sm:px-5"
                      >
                        Log In
                      </Button>
                    </Link>
                  </div>
                </div>
              </header>
            </div>

            {/* hero section */}
            <div className="mx-auto flex w-full max-w-[1117px] items-center gap-[45px] md:flex-col md:p-5">
              <Img src="images/img_rectangle_3.png" alt="image" className="h-[582px] w-[51%] object-cover md:w-full" loading="lazy" />
              <div className="flex w-[49%] flex-col gap-3.5 md:w-full">
                <div className="flex items-start gap-3 sm:flex-col">
                  <div className="mt-[5px] h-[135px] w-[12px] bg-light_blue-800" />
                  <Heading size="xl" as="h1" className="!font-sairacondensed">
                    We Are Hiring
                  </Heading>
                </div>
                <div className="left-[50px] flex items-center sm:flex-col">
                  <Link to="/guest">
                    <Button
                      color="light_blue_800"
                      size="7xl"
                      shape="square"
                      className="relative z-[1] mb-7 ml-[360px] min-w-[247px] self-end sm:px-5"
                    >
                      Apply Now
                    </Button>
                  </Link>
                  <Text size="3xl" as="p" className="relative ml-[-600px] w-[67%] leading-[50px] sm:ml-0 sm:w-full">
                    If you are interested, Please click Sign Up and register to create an account. Once the account is
                    created, Submit your resume. Goodluck!
                  </Text>
                </div>
              </div>
            </div>

            {/* footer section */}
            <footer className="self-stretch">
              <div className="flex h-full justify-center bg-light_blue-800 pb-2.5 pt-[7px]">
                <div className="container-xs flex justify-center px-1.5 md:p-5">
                  <div className="flex flex-col items-start">
                    <div className="flex flex-wrap items-baseline justify-center md:flex-col">
                      <Heading size="lg" as="h1" className="!font-sairacondensed !text-white-A700">
                        Join Us! Contact Here
                      </Heading>
                      <Img src="images/img_info.svg" alt="info_one" className="mb-[13px] ml-[532px] md:ml-0 md:w-full" loading="lazy" />
                      <Img
                        src="images/img_facebook.svg"
                        alt="facebook_one"
                        className="mb-[13px] ml-10 md:ml-0 md:w-full"
                        loading="lazy"
                      />
                      <Img src="images/img_trash.svg" alt="trash_one" className="mb-[13px] ml-10 md:ml-0 md:w-full" loading="lazy" />
                    </div>
                    <div className="relative ml-6 mt-[-1px] flex items-center gap-[18px] md:ml-0">
                      <Img src="images/img_call.svg" alt="call_one" className="h-[27px] w-[27px]" loading="lazy" />
                      <Text size="3xl" as="p" className="self-end !text-white-A700">
                        288718327
                      </Text>
                    </div>
                    <div className="ml-6 mt-[11px] flex flex-wrap items-start md:ml-0 md:flex-col">
                      <Img src="images/img_television.svg" alt="television_one" className="h-[27px] w-[28px] md:w-full" loading="lazy" />
                      <Text size="3xl" as="p" className="ml-[18px] !text-white-A700 md:ml-0">
                        recruitment@laspinas.sti.edu.ph
                      </Text>
                      <Link to="/privacy-notice" className="ml-[244px] md:ml-0">
                        <Text size="2xl" as="p" className="!text-white-A700">
                          Privacy policy
                        </Text>
                      </Link>
                      <Link to="/terms" className="ml-20 md:ml-0">
                        <Text size="2xl" as="p" className="!text-white-A700">
                          Terms & conditions
                        </Text>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}
