import { useForm } from "@mantine/form";
import { NextSeo } from "next-seo";
import React from "react";
import {
  BuildingFill,
  EnvelopeAtFill,
  GeoAltFill,
  Github,
  Linkedin,
  PersonFill,
  TelephoneFill,
} from "react-bootstrap-icons";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    },
    validate: {
      email: value => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <>
      <NextSeo
        title="Get in Touch with Hussaini Usman"
        description="Want to discuss a project or collaborate on a new idea? Look no further. Fill out the contact form or use the provided information to reach out to the software developer behind this portfolio"
        locale="en"
        canonical={`${process.env.NEXT_PUBLIC_SITE_URL}/contact`}
        openGraph={{
          title: "Get in Touch with the Mastermind Behind the Code",
          description:
            "Want to discuss a project or collaborate on a new idea? Look no further. Fill out the contact form or use the provided information to reach out to the software developer behind this portfolio",
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/contact}`,
          images: [
            {
              url: process.env.NEXT_PUBLIC_SITE_LOGO,
              width: "400px",
              height: "150px",
              type: "svg",
              alt: "Hussaini Usman portfolio website logo",
            },
          ],
          type: "website",
        }}
        additionalMetaTags={[
          {
            property: "twitter:label1",
            content: "Written by",
          },
          {
            property: "twitter:data1",
            content: "Hussaini Usman",
          },
        ]}
      />

      <section className="max-w-3xl mx-auto rounded-lg flex flex-col items-center justify-center my-4 py-14 bg-primary bg-opacity-30 lg:px-24 px-8">
        <h1 className="font-bold text-3xl md:text-5xl text-center">
          Get in Touch
        </h1>
        <p className="font-semibold text-lg md:text-xl mt-2 text-center">
          Get in Touch with the Mastermind Behind this Portfolio
        </p>
      </section>

      <section className="max-w-3xl mx-auto my-10 px-5">
        <address className="space-y-4 lg:text-xl not-italic">
          <p className="flex flex-row items-center">
            <PersonFill className="mr-2" size={20} />
            Hussaini Maina Usman
          </p>
          <p className="flex flex-row items-center">
            <BuildingFill className="mr-2" size={20} />
            Full-Stack Engineer
          </p>
          <p className="flex flex-row items-center">
            <GeoAltFill className="mr-2" size={20} />
            <span>
              Unit E35-E36 Technology Incubation Center, Kano State, Nigeria.
            </span>
          </p>

          <a
            href="mailto:hello@hussainiusman.tech"
            target="_blank"
            className="flex flex-row items-center"
          >
            <EnvelopeAtFill className="mr-2" size={20} />
            hello@hussainiusman.tech
          </a>
          <a
            className="flex flex-row items-center"
            href="tel:+2349035989361"
            target="_blank"
          >
            <TelephoneFill className="mr-2" size={20} />
            +234 9035 9893 61
          </a>
          <div className="flex flex-row items-center space-x-4">
            <a
              className="bg-primary p-2 rounded-sm"
              href="https://www.linkedin.com/in/hussainiusman"
              target="_blank"
            >
              <Linkedin size={20} />
            </a>
            <a
              className="bg-primary p-2 rounded-sm"
              href="https://github.com/Housain-maina"
              target="_blank"
            >
              <Github size={20} />
            </a>
          </div>
        </address>
      </section>

      <section className="max-w-3xl mx-auto mt-6 mb-16 md:mb-20 lg:mb-28 bg-primary px-5 py-12 md:p-12 bg-opacity-30">
        <h1 className="font-bold text-3xl md:text-5xl text-center">
          Send Me an Email
        </h1>
        <p className="font-semibold text-lg md:text-xl mt-2 text-center">
          Get in touch with me by filling out this contact form
        </p>
        <form
          className="flex flex-col items-center space-y-4 md:space-y-6 mt-5 md:mt-10 font-medium"
          onSubmit={form.onSubmit(() => {
            emailjs
              .send(
                process.env.NEXT_PUBLIC_SERVICE_ID,
                process.env.NEXT_PUBLIC_TEMPLATE_ID,
                {
                  email: form.values.email,
                  fullName: form.values.firstName + " " + form.values.lastName,
                  subject: form.values.subject,
                  message: form.values.message,
                },
                process.env.NEXT_PUBLIC_PUBLIC_KEY
              )
              .then(() => {
                form.reset();
                alert(
                  "Email received. I will get back to you as soon as possible!"
                );
              })
              .catch(() => {
                alert("An error has occured please try again.");
              });
          })}
        >
          <div className="flex flex-col md:flex-row md:space-x-6 items-center space-y-4 md:space-y-0 w-full">
            <input
              name="firstName"
              className="bg-gray-300 text-gray-700 placeholder:opacity-70  lg:text-xl outline-none px-4 rounded-sm py-2 w-full"
              type="text"
              placeholder="First Name"
              {...form.getInputProps("firstName")}
            />

            <input
              name="lastName"
              className="bg-gray-300 text-gray-700 placeholder:opacity-70  lg:text-xl outline-none px-4 rounded-sm py-2 w-full"
              type="text"
              placeholder="Last Name"
              {...form.getInputProps("lastName")}
            />
          </div>
          <input
            name="email"
            className="bg-gray-300 text-gray-700 placeholder:opacity-70  lg:text-xl outline-none px-4 rounded-sm py-2 w-full"
            type="email"
            placeholder="Email Address"
            {...form.getInputProps("email")}
          />
          <input
            name="subject"
            className="bg-gray-300 text-gray-700 placeholder:opacity-70  lg:text-xl outline-none px-4 rounded-sm py-2 w-full"
            type="text"
            placeholder="Subject"
            {...form.getInputProps("subject")}
          />
          <textarea
            name="message"
            rows={7}
            className="bg-gray-300 text-gray-700 placeholder:opacity-70  lg:text-xl outline-none rounded-sm p-4 w-full"
            placeholder="Message"
            {...form.getInputProps("message")}
          />

          <button
            type="submit"
            className="place-self-start font-medium bg-primary text-white py-2 px-10 w-full lg:text-xl rounded-sm hover:bg-opacity-75 active:translate-y-0.5 transform transition-all"
          >
            Send Message
          </button>
        </form>
      </section>
    </>
  );
};

export default Contact;
