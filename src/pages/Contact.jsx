import React, { useRef } from "react";
import img from "../assets/img/contact.jpg";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const sendEmail = (e) => {
    e.preventDefault();

    // Sent Auto-reply email to visitors
    emailjs
      .send(
        "service_b641t1g",
        "template_ijbip7j", // Auto-reply template ID
        {
          to_name: e.target.cName.value,
          to_email: e.target.email.value,
          message:
            "Thank you for reaching out to BlogVerse! We’ve received your message and will get back to you soon.",
        },
        "zzEyGwvrfoRmCDL9V"
      )
      .then(() => {
        console.log("Auto-reply sent successfully");
      })
      .catch((error) => {
        console.error("Auto-reply error:", error);
      });

    // message sent to the Owner
    emailjs
      .sendForm(
        "service_b641t1g",
        "template_yyf109k", //  Owner notification template ID
        form.current,
        "zzEyGwvrfoRmCDL9V"
      )
      .then(() => {
        alert("Message sent successfully!");
        form.current.reset();
      })
      .catch((error) => {
        console.error("Owner notification error:", error);
        alert("Failed to send message.");
      });
  };

  return (
    <div className="px-4 py-10 w-full">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <h1 className="text-center text-3xl sm:text-4xl font-bold font-pacifico">
          Contact Us
        </h1>

        <div className="flex flex-col lg:flex-row gap-6 p-5">
          {/* Image Section */}
          <div className="w-full lg:w-1/2 h-64 sm:h-80 lg:h-[400px] overflow-hidden rounded-2xl">
            <img
              src={img}
              alt="Contact img"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Form Section */}
          <div className="w-full lg:w-1/2">
            <form
              ref={form}
              onSubmit={sendEmail}
              className="flex flex-col gap-5 w-full"
            >
              {/* Full Name */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="cName"
                  className="text-gray-700 text-sm font-medium"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="cName"
                  {...register("cName", { required: true })}
                  aria-invalid={errors.cName ? "true" : "false"}
                  placeholder="Enter your name"
                  name="cName"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
                {errors.cName && (
                  <p className="text-red-500 text-sm">Full name is required</p>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-gray-700 text-sm font-medium"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", { required: true })}
                  aria-invalid={errors.email ? "true" : "false"}
                  placeholder="Enter your email address"
                  name="email"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">Email is required</p>
                )}
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="subject"
                  className="text-gray-700 text-sm font-medium"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  {...register("subject", { required: true })}
                  aria-invalid={errors.subject ? "true" : "false"}
                  placeholder="Enter subject"
                  name="subject"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm">Subject is required</p>
                )}
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-gray-700 text-sm font-medium"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  {...register("message", { required: true })}
                  aria-invalid={errors.message ? "true" : "false"}
                  rows="5"
                  placeholder="Type your message here..."
                  name="message"
                  className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none shadow-sm"
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-sm">
                    Message field is required
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div>
                <input
                  type="submit"
                  value="Send"
                  className="bg-blue-600 px-4 py-2 font-semibold text-white rounded-lg hover:bg-blue-500 cursor-pointer transition"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
