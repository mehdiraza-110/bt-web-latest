import Link from "next/link";
import Image from "next/image";
import { MapPin, Star, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface InstituteCardProps {
  id: string;
  institute_name: string;
  institute_type: string;
  city: string;
  rating: number;
  students?: number;
  image?: string;
  category: string;
  featured?: boolean;
  type?: string;
}

const getInstituteSlug = (type: string) => {
  const map: Record<string, string> = {
    School: "schools",
    College: "colleges",
    University: "universities",
  };
  return map[type] || type.toLowerCase();
};

const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");


const InstituteCard = ({
  id,
  institute_name,
  institute_type,
  city,
  students,
  image,
  featured = false,
}: InstituteCardProps) => {
  return (

    
    
  <Link
    href={`/${getInstituteSlug(institute_type)}/${slugify(
      institute_name
    )}-${id}`}
  >
      <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden h-full">
        <div className="relative h-48 overflow-hidden bg-muted">
          {image ? (
            <Image
              src={image}
              alt={institute_name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary to-secondary">
              <span className="text-4xl font-bold text-primary-foreground opacity-20">
                {institute_name?.substring(0, 2).toUpperCase()}
              </span>
            </div>
          )}
          {featured && (
            <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">
              Featured
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <div className="mb-2">
            <Badge variant="outline" className="text-xs mb-2">
              {institute_type}
            </Badge>
            <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
              {institute_name}
            </h3>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <MapPin className="h-4 w-4" />
            <span className="line-clamp-1">{city}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            {students && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{students} students</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default InstituteCard;



