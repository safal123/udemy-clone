import Link from "next/link"
import { Logo } from '@/app/(dashbaord)/_components/Logo'

export default function Component() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-950 text-gray-50 py-12 md:py-16 lg:py-20 dark:bg-gray-900 dark:text-gray-200">
      <div className="container max-w-7xl mx-auto px-4 md:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="flex flex-col gap-4">
          <Link className="flex items-center gap-2 font-bold text-lg" href="#">
            <Logo />
            <span>
              Udemy Clone
            </span>
          </Link>
          <p className="text-gray-400 dark:text-gray-400 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor.
          </p>
          <div className="flex items-center gap-3">
            <Link aria-label="Twitter" href="#">
              <TwitterIcon className="w-5 h-5" />
            </Link>
            <Link aria-label="Facebook" href="#">
              <FacebookIcon className="w-5 h-5" />
            </Link>
            <Link aria-label="Instagram" href="#">
              <InstagramIcon className="w-5 h-5" />
            </Link>
            <Link aria-label="LinkedIn" href="#">
              <LinkedinIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div className="grid gap-3">
            <h4 className="font-medium">Product</h4>
            <Link className="text-sm text-gray-400 hover:text-gray-50 dark:hover:text-gray-200" href="#">
              Features
            </Link>
            <Link className="text-sm text-gray-400 hover:text-gray-50 dark:hover:text-gray-200" href="#">
              Pricing
            </Link>
            <Link className="text-sm text-gray-400 hover:text-gray-50 dark:hover:text-gray-200" href="#">
              Docs
            </Link>
            <Link className="text-sm text-gray-400 hover:text-gray-50 dark:hover:text-gray-200" href="#">
              Roadmap
            </Link>
          </div>
          <div className="grid gap-3">
            <h4 className="font-medium">Company</h4>
            <Link className="text-sm text-gray-400 hover:text-gray-50 dark:hover:text-gray-200" href="#">
              About
            </Link>
            <Link className="text-sm text-gray-400 hover:text-gray-50 dark:hover:text-gray-200" href="#">
              Blog
            </Link>
            <Link className="text-sm text-gray-400 hover:text-gray-50 dark:hover:text-gray-200" href="#">
              Careers
            </Link>
            <Link className="text-sm text-gray-400 hover:text-gray-50 dark:hover:text-gray-200" href="#">
              Contact
            </Link>
          </div>
        </div>
        <div className="grid gap-3">
          <h4 className="font-medium">Resources</h4>
          <Link className="text-sm text-gray-400 hover:text-gray-50 dark:hover:text-gray-200" href="#">
            Documentation
          </Link>
          <Link className="text-sm text-gray-400 hover:text-gray-50 dark:hover:text-gray-200" href="#">
            Community
          </Link>
          <Link className="text-sm text-gray-400 hover:text-gray-50 dark:hover:text-gray-200" href="#">
            Support
          </Link>
          <Link className="text-sm text-gray-400 hover:text-gray-50 dark:hover:text-gray-200" href="#">
            FAQs
          </Link>
        </div>
        <div className="grid gap-3">
          <h4 className="font-medium">Legal</h4>
          <Link className="text-sm text-gray-400 hover:text-gray-50 dark:hover:text-gray-200" href="#">
            Terms of Service
          </Link>
          <Link className="text-sm text-gray-400 hover:text-gray-50 dark:hover:text-gray-200" href="#">
            Privacy Policy
          </Link>
          <Link className="text-sm text-gray-400 hover:text-gray-50 dark:hover:text-gray-200" href="#">
            Cookie Policy
          </Link>
          <Link className="text-sm text-gray-400 hover:text-gray-50 dark:hover:text-gray-200" href="#">
            Disclaimer
          </Link>
        </div>
      </div>
    </footer>
  )
}

// @ts-ignore
function FacebookIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

// @ts-ignore
function InstagramIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

// @ts-ignore
function LinkedinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

// @ts-ignore
function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}


// @ts-ignore
function TwitterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}
