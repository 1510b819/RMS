import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom"; // Import Link
import { Button, Input, Text, Img, Heading } from "../../components";

export default function SignUpPage() {
  return (
    <>
      <Helmet>
        <title>Sign Up - Create Your User Account</title>
        <meta
          name="description"
          content="Register for a new user account with your first and last name, email, and password. Sign up today to start your journey with us."
        />
      </Helmet>

      {/* registration section */}
      <div className="w-full shadow-xs">
        {/* arrow down navigation section */}
        <div className="bg-white-A700 py-[19px]">
          <div className="mb-[34px] flex flex-col items-center gap-[19px]">
            <Link to="/Main"> {/* Use Link component */}
              <Img
                src="images/img_arrow_down.svg"
                alt="arrowdown_one"
                className="ml-[18px] h-[29px] self-start md:ml-0"
              />
            </Link>
            <div className="relative h-[149px] self-stretch">
              {/* user registration header section */}
              <div className="absolute bottom-0 left-0 right-0 top-0 m-auto flex h-max w-full justify-center bg-light_blue-800 p-[18px]">
                <Heading size="md" as="h1" className="mt-[5px] !text-white-A700">
                  User Registration
                </Heading>
              </div>
              <Img
                src="images/img_image_1.png"
                alt="imageone_one"
                className="absolute bottom-0 left-[5%] top-0 my-auto h-[149px] w-[23%] object-cover"
              />
            </div>
            <div className="flex w-[58%] flex-col items-center md:w-full md:p-5">
              {/* user details form section */}
              <div className="flex gap-8 self-stretch md:flex-col">
                <div className="flex w-[41%] flex-col items-start gap-1.5 md:w-full">
                  <Text size="3xl" as="p" className="!text-gray-700">
                    First Name
                  </Text>
                  <Input shape="round" name="firstName" />
                </div>
                <div className="flex flex-1 flex-col items-start gap-1.5 md:self-stretch">
                  <Text size="3xl" as="p" className="!text-gray-700">
                    Last Name
                  </Text>
                  <Input shape="round" name="lastName" />
                </div>
              </div>
              <Text size="3xl" as="p" className="mt-[13px] self-start !text-gray-700">
                Email
              </Text>
              <Input shape="round" name="email" className="mt-1.5" />
              <Text size="3xl" as="p" className="mt-[13px] self-start !text-gray-700">
                Password
              </Text>
              <Input shape="round" name="password" className="mt-1.5" />
              <Link to="/Main"> {/* Use Link component */}
                {/* signup button section */}
                <Button
                  color="light_blue_800"
                  size="4xl"
                  className="mt-[49px] min-w-[199px] rounded-[25px] font-bold sm:px-5"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
