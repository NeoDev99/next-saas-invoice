"use client";

import { useRouter } from 'next/navigation';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';

export default function LandingPage() {
  const router = useRouter();

  return (
    <main className="w-full bg-gradient-to-tr from-green-200">

      <header className="flex justify-between p-4">
        <h1 className="text-xl font-bold cursor-pointer">SaaS <span className='text-teal-400'>Invoicer</span></h1>
        <SignedIn>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700 dark:text-gray-200">
              <UserButton showName />
            </span>
          </div>
        </SignedIn>

        <SignedOut>
          <div className="right-4 top-4">
            <SignInButton mode="modal">
              <button className="rounded-md bg-black py-1 px-4 text-white transition-all hover:bg-teal-700 hover:text-white text-center text-sm flex items-center justify-center">
                Sign In
              </button>
            </SignInButton>
          </div>
        </SignedOut>
      </header>

      <section className="section min-h-screen p-8 md:w-2/3 mx-auto text-center w-full flex flex-col items-center justify-center">
        <h2 className="text-7xl font-bold mb-4 md:text-4xl">
          Create invoices for your customers
        </h2>

        <p className="opacity-70 mb-4 text-sm md:text-base leading-loose">
          Invoicer is an online invoicing software that helps you craft and
          print professional invoices for your customers for free! Keep your
          business and clients with one invoicing software.
        </p>
        
        <SignedOut>
          <SignInButton mode="modal">
            <button className="rounded-full bg-black py-1.5 px-5 text-white transition-all hover:bg-teal-700 hover:text-white text-center text-sm flex items-center justify-center">
              Get Started
            </button>
          </SignInButton>
        </SignedOut>
        
        <SignedIn>
          <button
            onClick={() => router.push('/home')}
            className="rounded-full w-[150px] px-2 py-3 bg-teal-400 hover:bg-teal-700 text-gray-50"
          >
            Go to Home
          </button>
        </SignedIn>
      </section>
    </main>
  );
}



/*"use client";

import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className='w-full bg-gradient-to-tr from-green-200 dark:from-slate-400'>
      <section className='section min-h-screen p-8 h-[90vh] md:w-2/3 mx-auto text-center w-full flex flex-col items-center justify-center'>
        <h2 className='text-3xl font-bold mb-4 md:text-4xl'>
          Create invoices for your customers
        </h2>

        <p className='opacity-70 mb-4 text-sm md:text-base leading-loose'>
          Invoicer is an online invoicing software that helps you craft and
          print professional invoices for your customers for free! Keep your
          business and clients with one invoicing software.
        </p>
        
        <Link
          href='/'
          className='rounded w-[200px] px-2 py-3 bg-teal-400 text-gray-50 dark:bg-[#38bdff]'
        >
          LOG IN
        </Link>
        
      </section>
    </main>
  );
}
*/