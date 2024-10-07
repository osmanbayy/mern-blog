import { Footer, FooterCopyright, FooterDivider, FooterIcon, FooterLink, FooterLinkGroup, FooterTitle } from "flowbite-react";
import { Link } from "react-router-dom";
import { FaInstagram, FaXTwitter, FaLinkedin } from "react-icons/fa6";
import { FaCodepen, FaGithub } from "react-icons/fa";


export default function FooterCom() {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link to={"/"} className="self-center whitespace-nowrap text-lg lg:text-xl font-semibold dark:text-white">
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                oBay&apos;s
              </span>
              Blog
            </Link>
          </div>

          <div className="grid flex-col grid-cols-3 gap-3 mt-4 sm:gap-6 ">
            <div>
                <FooterTitle title="About" />
                <FooterLinkGroup col>
                    <FooterLink href="https://www.github.com/osmanbayy" target="_blank" rel="noopener noreferrer">
                        100 JS Projects
                    </FooterLink>
                    <FooterLink href="/about" target="_blank" rel="noopener noreferrer">
                        oBay&apos;s Blog
                    </FooterLink>
                </FooterLinkGroup>
            </div>
            <div>
                <FooterTitle title="Follow Us" />
                <FooterLinkGroup col>
                    <FooterLink href="https://www.github.com/osmanbayy" target="_blank" rel="noopener noreferrer">
                        Github
                    </FooterLink>
                    <FooterLink href="https://www.linkedin.com/in/osmanbayy/" target="_blank" rel="noopener noreferrer">
                        LinkedIn
                    </FooterLink>
                </FooterLinkGroup>
            </div>
            <div>
                <FooterTitle title="Legal" />
                <FooterLinkGroup col>
                    <FooterLink href="#" >
                        Privacy Policy
                    </FooterLink>
                    <FooterLink href="#">
                        Terms &amp; Conditions
                    </FooterLink>
                </FooterLinkGroup>
            </div>
          </div>
        </div>
        <FooterDivider />
        <div className="w-full sm:flex justify-between items-center">
            <FooterCopyright href="#" by="oBay's Blog" year={new Date().getFullYear()}/>
            <div className="flex gap-3 sm:mt-0 mt-4 sm:justify-center">
                <FooterIcon href="https://www.instagram.com/osmanbayy/" icon={FaInstagram} />
                <FooterIcon href="https://x.com/osmaanbayy" icon={FaXTwitter} />
                <FooterIcon href="https://www.linkedin.com/in/osmanbayy/" icon={FaLinkedin} />
                <FooterIcon href="https://github.com/osmanbayy/" icon={FaGithub} />
                <FooterIcon href="https://codepen.io/" icon={FaCodepen} />
            </div>
        </div>
      </div>
    </Footer>
  );
}
