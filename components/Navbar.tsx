"use client";

import { useState } from "react";
// import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, GraduationCap, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border backdrop-blur-sm bg-opacity-95">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2 group">
            <div className="bg-primary p-2 rounded-lg group-hover:scale-105 transition-transform">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-primary">Beyond Taleem</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/") ? "text-primary" : "text-foreground"
              }`}
            >
              Home
            </a>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors">
                Institutes <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <a href="/schools">Schools</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/colleges">Colleges</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/universities">Universities</a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <a
              href="/tests"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/tests") ? "text-primary" : "text-foreground"
              }`}
            >
              Tests
            </a>

            <a
              href="/admissions"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/admissions") ? "text-primary" : "text-foreground"
              }`}
            >
              Admissions
            </a>

            <a
              href="/blog"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/blog") ? "text-primary" : "text-foreground"
              }`}
            >
              Blog
            </a>

            <a
              href="/contact"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/contact") ? "text-primary" : "text-foreground"
              }`}
            >
              Contact
            </a>

            <a href="/compare">
              <Button variant="outline" size="sm">Compare</Button>
            </a>

            <a href="/admin-login">
              <Button size="sm" className="bg-primary hover:bg-primary/90">Admin</Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-3">
              <a
                href="/"
                className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-muted transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </a>
              <a
                href="/schools"
                className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-muted transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Schools
              </a>
              <a
                href="/colleges"
                className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-muted transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Colleges
              </a>
              <a
                href="/universities"
                className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-muted transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Universities
              </a>
              <a
                href="/tests"
                className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-muted transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Tests
              </a>
              <a
                href="/admissions"
                className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-muted transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Admissions
              </a>
              <a
                href="/blog"
                className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-muted transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Blog
              </a>
              <a
                href="/contact"
                className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-muted transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </a>
              <a
                href="/compare"
                className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-muted transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Compare Institutes
              </a>
              {/* <Link
                href="/admin-login"
                className="px-3 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Admin Dashboard
              </Link> */}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;


