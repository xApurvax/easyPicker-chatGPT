import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import FooterNew from './FooterNew'
import NavbarNewA from './NavBarNewA'
import { GoHome } from 'react-icons/go'

const PrivacyPolicy = () => {
  const history = useNavigate()
  useEffect(() => {
    document.title = 'Privacy policy | Title Generator'
  }, [])

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="sticky top-0 w-full z-[20]">
        <NavbarNewA />
      </div>
      <div className="my-5 max-w-[90%] flex flex-col gap-5">
        <h1 className="font-800 font-bold ms:text-xl text-2xl text-[#141414] flex items-center gap-1">
          <GoHome
            className="cursor-pointer"
            onClick={(e) => {
              e.preventDefault()
              history('/')
            }}
          />{' '}
          / Privacy Policy
        </h1>
        <p className="text-xs md:text-base text-[#353535]">
          {' '}
          <a href="/" className="text-[#544BB9] font-semibold">
            AI Title Generator
          </a>{' '}
          website is owned by{' '}
          <a
            href="https://infynno.com/"
            target="_blank"
            className="text-[#544BB9] font-semibold"
            rel="noreferrer"
          >
            Infynno
          </a>
          , which is a data controller of your personal data.
        </p>

        <p className="text-xs md:text-base text-[#353535]">
          We have adopted this Privacy Policy, which determines how we are
          processing the information collected by{' '}
          <a href="/" className="text-[#544BB9] font-semibold">
            AI Title Generator
          </a>
          , which also provides the reasons why we must collect certain personal
          data about you. Therefore, you must read this Privacy Policy before
          using{' '}
          <a
            href="/"
            className="text-[#544BB9] font-semibold max-w-[90%] break-all"
          >
            https://tagline.djsc7c8h3ryev.amplifyapp.com/
          </a>{' '}
          website.
        </p>

        <p className="text-xs md:text-base text-[#353535]">
          We take care of your personal data and undertake to guarantee its
          confidentiality and security.
        </p>

        <div className="flex flex-col gap-3">
          <h2 className="text-base md:text-lg font-600 font-bold text-[#141414]">
            Personal information we collect:
          </h2>
          <p className="text-xs md:text-base text-[#353535]">
            When you visit the{' '}
            <a
              href="/"
              className="text-[#544BB9] font-semibold max-w-[90%] break-all"
            >
              https://tagline.djsc7c8h3ryev.amplifyapp.com
            </a>{' '}
            website, we automatically collect certain information about your
            device, including information about your web browser, IP address,
            time zone, and some of the installed cookies on your device.
            Additionally, as you browse the Site, we collect information about
            the individual web pages or products you view, what websites or
            search terms referred you to the Site, and how you interact with the
            Site. We refer to this automatically-collected information as
            “Device Information.” Moreover, we might collect the personal data
            you provide to us (including but not limited to Name, Surname,
            Address, payment information, etc.) during registration to be able
            to fulfill the agreement.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-base md:text-lg font-600 font-bold text-[#141414]">
            Why do we process your data?
          </h2>
          <p className="text-xs md:text-base text-[#353535]">
            Our top priority is customer data security, and, as such, we may
            process only minimal user data, only as much as it is absolutely
            necessary to maintain the website. Information collected
            automatically is used only to identify potential cases of abuse and
            establish statistical information regarding website usage. This
            statistical information is not otherwise aggregated in such a way
            that it would identify any particular user of the system.
          </p>
        </div>

        <p className="text-xs md:text-base text-[#353535]">
          You can visit the website without telling us who you are or revealing
          any information, by which someone could identify you as a specific,
          identifiable individual. If, however, you wish to use some of the
          website&apos;s features, or you wish to receive our newsletter or
          provide other details by filling a form, you may provide personal data
          to us, such as your email, first name, last name, city of residence,
          organization, telephone number. You can choose not to provide us with
          your personal data, but then you may not be able to take advantage of
          some of the website&spos;s features. For example, you won&spos;t be
          able to receive our Newsletter or contact us directly from the
          website. Users who are uncertain about what information is mandatory
          are welcome to{' '}
          <a
            href="https://infynno.com/get-a-quote/"
            target="_blank"
            className="text-[#544BB9] font-semibold"
            rel="noreferrer"
          >
            contact us
          </a>
        </p>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col">
            <h2 className="text-base md:text-lg font-600 font-bold text-[#141414]">
              Your rights:
            </h2>
            <h2 className="text-base md:text-lg font-600 font-bold text-[#141414]">
              You have the following rights related to your personal data:
            </h2>
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-xs md:text-base text-[#353535]">
              ● The right to be informed.
            </p>
            <p className="text-xs md:text-base text-[#353535]">
              ● The right of access.
            </p>
            <p className="text-xs md:text-base text-[#353535]">
              ● The right to rectification.
            </p>
            <p className="text-xs md:text-base text-[#353535]">
              ● The right to erasure.
            </p>
            <p className="text-xs md:text-base text-[#353535]">
              ● The right to restrict processing.
            </p>
            <p className="text-xs md:text-base text-[#353535]">
              ● The right to data portability.
            </p>
            <p className="text-xs md:text-base text-[#353535]">
              ● The right to object.
            </p>
            <p className="text-xs md:text-base text-[#353535]">
              ● Rights in relation to automated decision-making and profiling.
            </p>
            <p className="text-xs md:text-base text-[#353535]">
              ● If you would like to exercise this right, please contact us
              through the contact information below.
            </p>
          </div>
        </div>

        <p className="text-xs md:text-base text-[#353535]">
          Additionally, if you are a European resident, we note that we are
          processing your information in order to fulfill contracts we might
          have with you (for example, if you make an order through the Site), or
          otherwise to pursue our legitimate business interests listed above.
          Additionally, please note that your information might be transferred
          outside of Europe, including Canada and the United States.
        </p>

        <div className="flex flex-col gap-3">
          <h2 className="text-base md:text-lg font-600 font-bold text-[#141414]">
            Links to other websites:
          </h2>
          <p className="text-xs md:text-base text-[#353535]">
            Our website may contain links to other websites that are not owned
            or controlled by us. Please be aware that we are not responsible for
            such other websites or third parties' privacy practices. We
            encourage you to be aware when you leave our website and read the
            privacy statements of each website that may collect personal
            information.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-base md:text-lg font-600 font-bold text-[#141414]">
            Information security:
          </h2>
          <p className="text-xs md:text-base text-[#353535]">
            We secure information you provide on computer servers in a
            controlled, secure environment, protected from unauthorized access,
            use, or disclosure. We keep reasonable administrative, technical,
            and physical safeguards to protect against unauthorized access, use,
            modification, and personal data disclosure in its control and
            custody. However, no data transmission over the Internet or wireless
            network can be guaranteed.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-base md:text-lg font-600 font-bold text-[#141414]">
            Legal disclosure:
          </h2>
          <p className="text-xs md:text-base text-[#353535]">
            We will disclose any information we collect, use or receive if
            required or permitted by law, such as to comply with a subpoena or
            similar legal process, and when we believe in good faith that
            disclosure is necessary to protect our rights, protect your safety
            or the safety of others, investigate fraud, or respond to a
            government request.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-base md:text-lg font-600 font-bold text-[#141414]">
            Contact information:
          </h2>
          <p className="text-xs md:text-base text-[#353535]">
            If you would like to contact us to understand more about this Policy
            or wish to contact us concerning any matter relating to individual
            rights and your Personal Information, you may{' '}
            <a
              href="https://infynno.com/get-a-quote/"
              target="_blank"
              className="text-[#544BB9] font-semibold"
              rel="noreferrer"
            >
              contact us
            </a>
            .
          </p>
        </div>
      </div>
      <div className="relative z-[10] w-full">
        <FooterNew />
      </div>
    </div>
  )
}

export default PrivacyPolicy
