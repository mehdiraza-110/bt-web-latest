import Link from "next/link";
import { GraduationCap, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary-foreground p-2 rounded-lg">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xl font-bold">Beyond Taleem</span>
            </div>
            <p className="text-primary-foreground/80 text-sm mb-4">
              Your comprehensive guide to educational institutes across Pakistan. Explore, Compare, and Enroll with confidence.
            </p>
            <div className="flex gap-3">
              <a href="#" className="hover:text-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-accent transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/schools" className="hover:text-accent transition-colors">Schools</Link>
              </li>
              <li>
                <Link href="/colleges" className="hover:text-accent transition-colors">Colleges</Link>
              </li>
              <li>
                <Link href="/universities" className="hover:text-accent transition-colors">Universities</Link>
              </li>
              <li>
                <Link href="/tests" className="hover:text-accent transition-colors">Tests</Link>
              </li>
              <li>
                <Link href="/admissions" className="hover:text-accent transition-colors">Admissions</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blog" className="hover:text-accent transition-colors">Blog & Guides</Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-accent transition-colors">Compare Institutes</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent transition-colors">Contact Us</Link>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">FAQs</a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
              </li>
              <li>
                <Link href="/admin-login" className="hover:text-accent transition-colors font-medium">Admin Dashboard</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>Islamabad, Pakistan</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span>+92 300 1234567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <span>info@beyondtaleem.pk</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/80">
          <p>&copy; {new Date().getFullYear()} Beyond Taleem. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;



