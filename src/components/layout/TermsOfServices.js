import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FooterNew from './FooterNew';
import NavbarNewA from './NavBarNewA';
import { GoHome } from "react-icons/go";

const TermsOfServices = () => {
  const history = useNavigate();
  useEffect(() => {
    document.title = "Terms of use | Title Generator"
  }, [])
  return (
    <div className='flex flex-col justify-center items-center'>
    <div className='sticky top-0 w-full z-[20]'>  
        <NavbarNewA />
    </div> 
    <div className='my-5 max-w-[90%] flex flex-col gap-5'>
      <h1 className='font-800 font-bold ms:text-xl text-2xl text-[#141414] flex items-center gap-1' >
      <GoHome className='cursor-pointer' onClick={(e) => {e.preventDefault();
                    history('/');
            }} /> / Terms of use</h1>
         <p className="text-xs md:text-base text-[#353535]">These Terms of Service ("Agreement") are a legally binding agreement between the user or subscriber of the Services ("User" or "you") and <a href='https://infynno.com/' target="_blank" className='text-[#544BB9] font-semibold whitespace-pre-wrap'>Infynno</a>, a Software solution provider with its principal place of business at 1208 Ganesh Glory, Nr. BSNL Office, Jagatpur Chenpur Road, Gota, Sarkhej - Gandhinagar Highway, Ahmedabad - 382481 Gujarat, India("Infynno", "we" or "us"). By registering for the Services or by accessing or using the Services or Website, you acknowledge that you have read, understood, and agree to be bound by the terms of this Agreement. If you are entering into this Agreement on behalf of a business or other legal entity, you represent that you have the authority to bind such entity to this Agreement, in which case the terms “User”, “you” or “your” shall refer to such entity. If you do not have such authority, or if you do not agree with the terms of this Agreement, you must not accept this Agreement and may not use the Services. You acknowledge that this Agreement is a contract between you and infynno, even though it is electronic and is not physically signed by you, and it governs your use of the Services.
        </p>

        <h2 className="text-base md:text-lg font-600 font-bold text-[#141414]">PLEASE READ THESE TERMS OF SERVICE CAREFULLY. IF YOU DO NOT AGREE WITH THESE TERMS, YOU MAY NOT REGISTER FOR OR USE THE SERVICES.</h2>



         <p className="text-xs md:text-base text-[#353535]"> Third Party Sites, Services and Products. The Services and this Website may refer or link to third-party sites, products or services. Third-party sites (“Third Party Sites”) to which we link are provided to you for your convenience only and are not under our control. We are not responsible for the content available on any Third Party Sites, and linking to any Third Party Sites does not imply our endorsement of any content or information on such Third Party Sites. We are not responsible for monitoring any transaction between you and any such Third Party Sites and do not warrant, endorse, guarantee, or assume responsibility for them. We may also use third party services and products within the Services (“Third Party Services and Products”), including, but not limited to, payment processing services, information and communication services, analytics services, mapping services, internet advertising platforms, and advertising service providers. Your use of Third Party Services and Products may be subject to such third party’s terms of service to be accepted by you prior to your use of such Third Party Services and Products, including but not limited to the YouTube Terms of Service, available at <a className='underline max-w-[90%] break-all' href='https://www.youtube.com/t/terms' target="_blank">https://www.youtube.com/t/terms/</a>, Google Maps/Google Earth Additional Terms of Service, available at <a className='underline max-w-[90%] break-all' href='https://www.google.com/help/terms_maps/' target="_blank">https://www.google.com/help/terms_maps/</a> and Google Privacy Policy available at <a className='underline max-w-[90%] break-all' href='https://policies.google.com/privacy' target="_blank">https://policies.google.com/privacy/</a>.</p>
        
        <div className='flex flex-col gap-3'>
          <h2 className="text-base md:text-lg font-600 font-bold text-[#141414]">Visitors and Users:</h2>
           <p className="text-xs md:text-base text-[#353535]">When you visit the <a href='/' className='text-[#544BB9] font-semibold max-w-[90%] break-all'>https://tagline.djsc7c8h3ryev.amplifyapp.com</a> You can visit the Website in a visitor (non-registered) capacity; provided, to use the Services, you must register as either a paid or unpaid User. As an unpaid User, you will have access only to certain limited functionality within the Services that <a href='https://infynno.com/' target="_blank" className='text-[#544BB9] font-semibold'>Infynno</a> elects to make available on an unpaid trial or free basis (“Unpaid Services”). As a paid User you will have access to certain additional features, which may include, without limitation, reporting and the ability to save your preferences and other settings (“Paid Services”).
          </p>
        </div>

        <div className='flex flex-col gap-3'>
          <h2 className="text-base md:text-lg font-600 font-bold text-[#141414]"> Right to Use Services:</h2>
           <p className="text-xs md:text-base text-[#353535]">Subject to the terms and conditions of this Agreement, Infynno hereby grants you permission to access and use the Services and the Website solely for your own internal business purposes in accordance with this Agreement and the limitations of the subscription plan that you select when subscribing to the Services (“Subscription Plan”), which may be found at https://www.infynno.com/ or another URL that we designate. You represent and warrant that: (a) all registration information you submit is truthful and accurate; (b) you will maintain the accuracy of such information; (c) you are at least 18 years of age and have the capacity and authority to enter into this Agreement; and (d) your use of the Services does not and will not violate any applicable law or regulation. If you are under 18, you may not register or attempt to register for the Services.
          </p>
        </div>

        <div className='flex flex-col gap-3'>
        <h2 className="text-base md:text-lg font-600 font-bold text-[#141414]">Content:</h2>
         <p className="text-xs md:text-base text-[#353535]">You are solely responsible for all data, information, suggestions, text, content and other materials that you upload, post, deliver, provide or otherwise transmit or store (hereinafter, “post(ing)”) to or in connection with the Services (“Content”). By posting Content to or through the Services, you grant Infynno a worldwide, non-exclusive, perpetual, irrevocable, royalty-free, fully paid, sublicensable and transferable license to use, modify, reproduce, distribute, display, publish and perform such Content in connection with its provision of the Services. Infynno has the right, but not the obligation, to monitor the Content, the Services and your use thereof. You agree that we may remove or disable any Content that we in good faith determine violates any applicable law, the terms of this Agreement, or any third party right (including, but not limited to, upon receipt of any claim or allegation by a third party or governmental or regulatory authority relating to such Content) and we may disclose such Content and other information about your use of the Services if legally required to do so provided we will notify you (if not legally prohibited from doing so) in advance of such disclosure of Content which is not already public (through no fault of Infynno). You understand that the Services, including any Content, may be unencrypted and involve (a) transmissions over various networks; (b) changes to conform and adapt to technical requirements of connecting networks or devices; and (c) transmission to Infynno’s third party vendors and hosting partners to provide the necessary hardware, software, networking, storage, and related technology required to operate and maintain the Services. You acknowledge and agree that you bear sole responsibility for adequate security, protection and backup of the Content that you post to the Services and you warrant and represent that your Content and your use of your Content will not violate any applicable law or any third party right. Infynno will have no liability for any unauthorized access or use of any of your Content, or any corruption, deletion, destruction or loss thereof. You understand and agree that we may monitor your use of the Services as well as the use of the Services by all of our users and that we may use the information gathered in an aggregate and anonymous manner. You agree that we may use and publish such aggregate and anonymized information, provided that such information does not identify you. In addition, we may use the information that you submit to the Services without identifying you for purposes of improving the Services.</p>
        </div>

        <div className='flex flex-col gap-3'>
        <h2 className="text-base md:text-lg font-600 font-bold text-[#141414]">Privacy:</h2>
         <p className="text-xs md:text-base text-[#353535]">By using the Services, you authorize us to obtain, process, store, use and transmit your personal data in accordance with our Privacy Policy  <a href='https://tagline.djsc7c8h3ryev.amplifyapp.com/privacy-policy/' target="_blank" className='text-[#544BB9] font-semibold max-w-[90%] break-all'>https://tagline.djsc7c8h3ryev.amplifyapp.com/privacy-policy/</a>, which forms an integral part of this Agreement. If you elect to use Third Party Services and Products (through API or otherwise), client manager tool or other tools within Infynno Services that give Infynno access to personal data contained within your Content, you agree that you are the data controller of any such personal data will apply to Infynno's processing of such personal data on your behalf. Any capitalized terms not otherwise defined in the DPA shall have the same meaning as in this Agreement. In the event of a conflict between this Agreement and the DPA, the DPA will control. You acknowledge that the Services have not been designed to process or manage sensitive information and you agree not to use the Services to collect, manage or process sensitive information. We will not have, and we specifically disclaim, any liability that may result from your use of the Services to collect, process or manage sensitive information.</p>
        </div>
        
        <h2 className="text-base md:text-lg font-600 font-bold text-[#141414]"> REGISTRATION AND ACCOUNT.</h2>

        <div className='flex flex-col gap-3'>
        <h2 className="text-base md:text-lg font-600 font-bold text-[#141414]">Registration:</h2>
         <p className="text-xs md:text-base text-[#353535]"> To register as a User of Unpaid Services or Paid Services, you must create a user account (“User Account”) by following the registration procedures and instructions set forth on the Website. There is no cost to create the User Account, however, to access the functionality within the Paid Services, you will be required to provide billing details. Each User Account is intended and designed for use by an individual user, unless otherwise stated in your Subscription Plan. If your Subscription Plan includes multiple users (“Authorized Users”), you may give access to your User Account only to that number of Authorized Users as specified in your Subscription Plan, provided that each Authorized User agrees to comply with this Agreement. As a User of Paid Services, you can add Authorized Users to your User Account by sending a request via email to: mail@infynno.com or through your User Account and paying the applicable fees for the additional Authorized Users as described on the Website. If Infynno detects repeated accesses to the same User Account from various locations, devices, IP addresses in excess of the limits covered by your Subscription Plan, Infynno may immediately suspend or terminate such User Account in its sole discretion. Except as permitted by Infynno, User Accounts are not transferable.</p>
        </div>

        <div className='flex flex-col gap-3'>
        <h2 className="text-base md:text-lg font-600 font-bold text-[#141414]">User Responsibilities:</h2>
         <p className="text-xs md:text-base text-[#353535]"> You are solely responsible for (a) each Authorized User’s compliance with the terms of this Agreement; (b) maintaining accurate account information at all times, including a valid email address and billing information, if applicable, and updating such information as necessary; and (c) obtaining, maintaining and supporting at your own expense all hardware, software and services necessary to access the Services, including, but not limited to, internet service providers, telecommunications providers, web browsers. You are also responsible for maintaining the security of all of your User Accounts, including, but not limited to, your User login, password and API key, and for all activity occurring under your User Accounts. The API key is a form of access token provided by Infynno and can only be associated with one User Account.</p>
        </div>

        <h2 className="text-base md:text-lg font-600 font-bold text-[#141414]">FEES AND PAYMENT.</h2>

        <div className='flex flex-col gap-3'>
        <h2 className="text-base md:text-lg font-600 font-bold text-[#141414]">Fees:</h2>
         <p className="text-xs md:text-base text-[#353535]">Users of Paid Services will be charged the fees set forth in the relevant Subscription Plan or as otherwise agreed with Infynno in a written ordering document or other writing signed by Infynno and you (the "Fees"). You agree to pay the Fees monthly or annually in advance according to your Subscription Plan, or as otherwise agreed between you and us, by credit card or another payment method accepted on the Website. If you decide to pay for the Services according to the invoice(s), you agree to pay all undisputed invoices within thirty (30) days, unless otherwise mutually agreed between you and us in writing. You agree that we may charge interest of 1.5% per month for past due invoices, or the highest rate permitted by law, and you are liable for reasonable attorney fees and collection costs arising from our efforts to collect on past due amounts. If you fail to pay an invoice, we reserve the right to cancel your subscription and access to the Services, and any data associated with your subscription or the Services. You can access the details of your Subscription Plan, including any prepaid amounts, by accessing your User Account. Any bank fees and charges shall be borne solely by you. Except as otherwise set forth in our Cancellation and Refund Policy located at <a href='https://tagline.djsc7c8h3ryev.amplifyapp.com/privacy-policy/' target="_blank" className='text-[#544BB9] font-semibold max-w-[90%] break-all'>https://tagline.djsc7c8h3ryev.amplifyapp.com/privacy-policy/</a> ("Cancellation Policy"), all payment obligations are non-cancellable and all Fees paid are non-refundable. If you demonstrate a pattern of repeated registrations for paid Services followed by cancellation and request for refund, we may, in our sole discretion, withhold further registrations and/or refuse further refund</p>
        </div>

        <div className='flex flex-col gap-3'>
        <h2 className="text-base md:text-lg font-600 font-bold text-[#141414]">Taxes:</h2>
         <p className="text-xs md:text-base text-[#353535]">All Fees are exclusive of taxes, which we will charge as applicable. You agree to pay any taxes applicable to your use of the Services, other than taxes based upon our gross revenues or net income. If you are located in the European Union, all Fees are exclusive of any VAT and you represent that you are registered for VAT purposes in your member state. At our request, you will provide us with the VAT registration number under which you are registered in your member state. If you do not provide us with a VAT registration number prior to your transaction being processed, we will not issue refunds or credits for any VAT that was charged. If you are subject to GST, all Fees are exclusive of GST. If you are required to deduct or withhold any tax, you must pay the amount deducted or withheld as required by law and pay us an additional amount so that we receive payment in full as if there were no deduction or withholding.</p>
        </div>

        <div className='flex flex-col gap-3'>
        <h2 className="text-base md:text-lg font-600 font-bold text-[#141414]">Change in Fees:</h2>
         <p className="text-xs md:text-base text-[#353535]">We reserve the right to monitor the number of Users using your User Account. You agree to pay the additional Fees if you exceed the limits of your Subscription Plan. You also agree to pay the Fees applicable to any additional Services you add or any changes you make to your Subscription Plan during your subscription term. Such additional Fees will become effective as of the date of such addition or change and may not be decreased during the term of your Subscription Plan. If you are a User of Paid Services, we may change the Fees and introduce new charges applicable to your use of the Services, which (unless otherwise agreed in writing with Infynno) will become effective as of the first day of the renewal of your subscription term. We may increase the Fees upon notice if we make changes in the Services at your request.</p>
        </div>
        
        <h2 className="text-base md:text-lg font-600 font-bold text-[#141414]">GENERAL PROVISIONS.</h2>
       
        <div className='flex flex-col gap-3'>
          <h2 className="text-base md:text-lg font-600 font-bold text-[#141414]">Languages:</h2>
           <p className="text-xs md:text-base text-[#353535]">You agree that this Agreement is written in the English language and that the English language version of this Agreement and any related document (including notices) shall prevail. Notwithstanding the foregoing, if you are located in a country whose laws require that contracts be in the local language in order to be enforceable, then the version of this Agreement that governs is the local language version that is produced by Infynno within a reasonable time following your written request to us.</p>
        </div>

        <div className='flex flex-col gap-3'>
          <h2 className="text-base md:text-lg font-600 font-bold text-[#141414]">No Waiver:</h2>
           <p className="text-xs md:text-base text-[#353535]">No failure or delay by Infynno to exercise any right or remedy will be a waiver of such right or remedy or any other right or remedy. A waiver on one occasion will not be a waiver of any right or remedy on any future occasion.</p>
        </div>

        <div className='flex flex-col gap-3'>
          <h2 className="text-base md:text-lg font-600 font-bold text-[#141414]">Changes:</h2>
           <p className="text-xs md:text-base text-[#353535]">WE MAY CHANGE THE TERMS OF THIS AGREEMENT FROM TIME TO TIME BY POSTING THE UPDATED AGREEMENT ON THE WEBSITE. YOU CAN REVIEW THE MOST CURRENT VERSION OF THIS AGREEMENT AT ANY TIME AT <a href='https://tagline.djsc7c8h3ryev.amplifyapp.com/privacy-policy/' target="_blank" className='text-[#544BB9] font-semibold max-w-[90%] break-all'>https://tagline.djsc7c8h3ryev.amplifyapp.com/terms-of-use/</a> OR A SUCCESSOR URL THAT WE MAY DESIGNATE. THE REVISED TERMS AND CONDITIONS WILL BECOME EFFECTIVE IMMEDIATELY AFTER WE POST THE UPDATED TEXT ON THE WEBSITE. IF YOU USE THE SERVICES AFTER SUCH DATE, SUCH USE WILL CONSTITUTE ACCEPTANCE OF THE REVISED TERMS AND CONDITIONS. We also reserve the right to modify the Services from time to time in our sole discretion. If any change to this Agreement is not acceptable to you, or if any change we make to the Services is a material reduction in functionality, you may, as your sole remedy for such change, stop using the Services and send a cancellation request email to mail@infynno.com.</p>
        </div>

    </div>
    <div className='relative z-[10] w-full'>
        <FooterNew />
      </div>
    </div>
  )
}

export default TermsOfServices