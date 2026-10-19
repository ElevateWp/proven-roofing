'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { CLINIC_INFO, SERVICES } from '@/lib/clinic-data';
import Button from '@/components/ui/Button';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on page change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
    setServicesDropdownOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
    <header
      data-site-header
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,padding,box-shadow] duration-300 ${
        isScrolled || mobileMenuOpen
          ? 'bg-paper/95 backdrop-blur-md py-2 sm:py-2.5 border-b border-[#DCE5EF]/80 shadow-[0_4px_24px_rgba(0,0,0,0.06)]'
          : 'bg-paper/95 md:bg-paper/90 backdrop-blur-md py-2.5 sm:py-3 border-b border-[#DCE5EF] shadow-sm'
      }`}
    >
      <div className="max-w-site mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo - compact on mobile */}
        <Link
          href="/"
          className="group flex items-center no-underline focus-visible:outline-offset-4 flex-shrink-0 min-w-0"
          aria-label="Proven Roofing"
        >
          <Image
            src="/images/logo.png"
            alt="Proven Roofing logo"
            width={180}
            height={100}
            priority
            className="w-[140px] h-[78px] sm:w-[160px] sm:h-[89px] md:w-[180px] md:h-[100px] flex-shrink-0 object-contain transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </Link>

        {/* Desktop Primary Navigation (Active on xl screens >= 1200px) */}
        <nav className="hidden xl:flex items-center gap-7 2xl:gap-8" aria-label="Main navigation">
          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesDropdownOpen(true)}
            onMouseLeave={() => setServicesDropdownOpen(false)}
          >
            <button
              type="button"
              className={`font-body text-15 py-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
                SERVICES.some((service) => pathname?.startsWith(`/${service.slug}/`))
                  ? 'text-[#172C4D] font-semibold'
                  : 'text-[#172C4D]/80 hover:text-[#68798D] font-medium'
              }`}
              aria-expanded={servicesDropdownOpen}
            >
              <span>Services</span>
              <span
                className={`w-1.5 h-1.5 border-r border-b border-[#172C4D]/60 transition-transform duration-200 ${
                  servicesDropdownOpen ? '-rotate-135 -translate-y-0.5' : 'rotate-45 translate-y-[-2px]'
                }`}
                aria-hidden="true"
              />
            </button>

            {/* Dropdown Panel with Pure White Background and Smooth Shadow */}
            {servicesDropdownOpen && (
              <div className="absolute top-full -left-4 pt-2 w-64 z-50 animate-fade-in">
                <div className="p-2 bg-paper border border-[#DCE5EF] shadow-[0_12px_36px_rgba(17,17,17,0.08)] rounded-2xl">
                  <div className="space-y-0.5">
                    {SERVICES.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/${s.slug}/`}
                        className={`block px-3.5 py-2 text-14 font-body transition-all duration-200 rounded-xl ${
                          pathname === `/${s.slug}/`
                            ? 'bg-[#F4F8FC] text-[#172C4D] font-semibold shadow-xs'
                            : 'text-[#172C4D]/85 hover:bg-[#F4F8FC]/50 hover:text-[#68798D] hover:translate-x-1'
                        }`}
                      >
                        <span className="block font-medium">{s.navLabel}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/about/"
            className={`font-body text-15 py-2 transition-colors ${
              pathname === '/about/'
                ? 'text-[#172C4D] font-semibold'
                : 'text-[#172C4D]/80 hover:text-[#68798D] font-medium'
            }`}
          >
            About Us
          </Link>

          <Link
            href="/testimonials/"
            className={`font-body text-15 py-2 transition-colors ${
              pathname?.startsWith('/testimonials')
                ? 'text-[#172C4D] font-semibold'
                : 'text-[#172C4D]/80 hover:text-[#68798D] font-medium'
            }`}
          >
            Testimonials
          </Link>

          <Link
            href="/our-team/"
            className={`font-body text-15 py-2 transition-colors ${
              pathname?.startsWith('/our-team')
                ? 'text-[#172C4D] font-semibold'
                : 'text-[#172C4D]/80 hover:text-[#68798D] font-medium'
            }`}
          >
            Our Team
          </Link>

          <Link
            href="/blog/"
            className={`font-body text-15 py-2 transition-colors ${
              pathname?.startsWith('/blog')
                ? 'text-[#172C4D] font-semibold'
                : 'text-[#172C4D]/80 hover:text-[#68798D] font-medium'
            }`}
          >
            Roofing Advice
          </Link>

          <Link
            href="/contact/"
            className={`font-body text-15 py-2 transition-colors ${
              pathname === '/contact/'
                ? 'text-[#172C4D] font-semibold'
                : 'text-[#172C4D]/80 hover:text-[#68798D] font-medium'
            }`}
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <Link
            href="/request-a-quote/"
            className="hidden xl:inline-flex h-10 w-[176px] items-center justify-center rounded-md border border-[#F15A24] bg-[#F15A24] px-3 font-body text-13 font-semibold text-white transition-colors hover:border-[#FF773D] hover:bg-[#FF773D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F15A24] whitespace-nowrap"
          >
            <span>Discuss Your Project</span>
          </Link>

          <Button
            href="/request-a-quote/"
            variant="forest"
            size="sm"
            className="hidden xl:inline-flex h-9 w-[160px] items-center justify-center gap-2 px-2 text-12 sm:text-13 font-semibold whitespace-nowrap"
          >
            <span>Get a Quote</span>
          </Button>

          {/* Mobile / Tablet Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-[#172C4D] focus-visible:outline-offset-2 flex items-center justify-center cursor-pointer rounded-lg hover:bg-[#F4F8FC] transition-colors"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-controls="mobile-navigation"
            aria-expanded={mobileMenuOpen}
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span
                className={`w-full h-[2px] bg-[#172C4D] transition-transform duration-250 ${
                  mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`w-full h-[2px] bg-[#172C4D] transition-opacity duration-200 ${
                  mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`w-full h-[2px] bg-[#172C4D] transition-transform duration-250 ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </div>
    </header>

      {/* Mobile / Tablet Drawer Menu */}
      <div
        id="mobile-navigation"
        aria-label="Mobile navigation"
        aria-hidden={!mobileMenuOpen}
        className={`xl:hidden fixed inset-x-0 top-[95px] sm:top-[110px] md:top-[121px] bottom-0 bg-paper border-t border-[#DCE5EF] overflow-y-auto overscroll-contain px-4 sm:px-6 py-5 sm:py-6 flex flex-col justify-between z-[999] transition-all duration-300 ease-in-out shadow-2xl ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        <div className="flex flex-col space-y-4">
          <div>
            <button
              type="button"
              onClick={() => setMobileServicesOpen((open) => !open)}
              aria-expanded={mobileServicesOpen}
              aria-controls="mobile-services-list"
              className="flex min-h-12 w-full items-center justify-between py-2 text-left font-body text-13 font-bold uppercase tracking-wider text-[#172C4D]"
            >
              <span>Services</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className={`mr-1 h-4 w-4 text-[#172C4D]/70 transition-transform duration-200 ${
                  mobileServicesOpen ? 'rotate-180' : 'rotate-0'
                }`}
              >
                <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {mobileServicesOpen && (
              <div id="mobile-services-list" className="grid grid-cols-1 gap-1.5 pb-2 sm:grid-cols-2">
                {SERVICES.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/${s.slug}/`}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setMobileServicesOpen(false);
                    }}
                    className={`flex min-h-11 items-center rounded-md px-3 font-body text-15 transition-colors ${
                      pathname === `/${s.slug}/`
                        ? 'bg-[#FCE5D9] font-semibold text-[#172C4D]'
                        : 'text-[#172C4D] hover:bg-[#F4F8FC] hover:text-[#68798D]'
                    }`}
                  >
                    {s.navLabel}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-[#DCE5EF] flex flex-col space-y-3">
            <Link
              href="/about/"
              onClick={() => setMobileMenuOpen(false)}
              className={`font-body text-16 transition-colors ${
                pathname === '/about/' ? 'text-[#172C4D] font-semibold' : 'text-[#172C4D] hover:text-[#68798D]'
              }`}
            >
              About Us
            </Link>
            <Link
              href="/testimonials/"
              onClick={() => setMobileMenuOpen(false)}
              className={`font-body text-16 transition-colors ${
                pathname?.startsWith('/testimonials') ? 'text-[#172C4D] font-semibold' : 'text-[#172C4D] hover:text-[#68798D]'
              }`}
            >
              Testimonials
            </Link>
            <Link
              href="/our-team/"
              onClick={() => setMobileMenuOpen(false)}
              className={`font-body text-16 transition-colors ${
                pathname?.startsWith('/our-team') ? 'text-[#172C4D] font-semibold' : 'text-[#172C4D] hover:text-[#68798D]'
              }`}
            >
              Our Team
            </Link>
            <Link
              href="/request-a-quote/"
              onClick={() => setMobileMenuOpen(false)}
              className={`font-body text-16 font-semibold text-[#172C4D] hover:underline`}
            >
              Discuss Your Project
            </Link>
            <Link
              href="/blog/"
              onClick={() => setMobileMenuOpen(false)}
              className={`font-body text-16 transition-colors ${
                pathname?.startsWith('/blog') ? 'text-[#172C4D] font-semibold' : 'text-[#172C4D] hover:text-[#68798D]'
              }`}
            >
              Roofing Advice
            </Link>
            <Link
              href="/contact/"
              onClick={() => setMobileMenuOpen(false)}
              className={`font-body text-16 transition-colors ${
                pathname === '/contact/' ? 'text-[#172C4D] font-semibold' : 'text-[#172C4D] hover:text-[#68798D]'
              }`}
            >
              Contact
            </Link>
          </div>
        </div>

        <div className="pt-6 mt-6 border-t border-[#DCE5EF] flex flex-col gap-3 pb-8">
          <Button
            href="/request-a-quote/"
            variant="forest"
            size="lg"
            className="w-full"
            onClick={() => setMobileMenuOpen(false)}
          >
            Get a Quote
          </Button>
          <a
            href={`tel:${CLINIC_INFO.contact.phone.replace(/[^0-9+]/g, '')}`}
            className="text-center font-body text-15 text-[#172C4D] py-2 font-semibold hover:text-[#68798D] transition-colors"
          >
            Call: {CLINIC_INFO.contact.phone}
          </a>
        </div>
      </div>
    </>
  );
}
