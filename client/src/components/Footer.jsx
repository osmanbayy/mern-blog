import { Footer, FooterTitle } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsLinkedin,
  BsTwitterX,
} from "react-icons/bs";

export default function FooterCom() {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full mx-auto max-w-7xl">
        <div className="grid justify-between w-full sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              to={"/"}
              className="self-center text-lg font-semibold whitespace-nowrap sm:text-xl dark:text-white"
            >
              <span className="px-2 py-1 text-white rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                OBAY's
              </span>
              Blog
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <FooterTitle title="About" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://osmanbay.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Go to website
                </Footer.Link>
                <Footer.Link
                  href="/about"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  OBAY's Blog
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div>
              <FooterTitle title="Follow Us" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://github.com/osmanbayy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </Footer.Link>
                <Footer.Link
                  href="https://www.linkedin.com/in/osmanbayy/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div>
              <FooterTitle title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-start sm:justify-between">
          <Footer.Copyright
            href="#"
            by="Osman Bay"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-4 mt-4 sm:mt-0 sm:justify-center">
            <Footer.Icon
              href="https://www.facebook.com/profile.php?id=100007242767631"
              icon={BsFacebook}
            />
            <Footer.Icon
              href="https://instagram.com/osmanbayy"
              icon={BsInstagram}
            />
            <Footer.Icon href="https://x.com/osmaanbayy" icon={BsTwitterX} />
            <Footer.Icon href="https://github.com/osmanbayy" icon={BsGithub} />
            <Footer.Icon
              href="https://www.linkedin.com/in/osmanbayy/"
              icon={BsLinkedin}
            />
          </div>
        </div>
      </div>
    </Footer>
  );
}
