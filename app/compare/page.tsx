"use client";

import { useState } from "react";
import { Plus, X, Star, MapPin, Users, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function Compare() {

  const [selectedInstitutes, setSelectedInstitutes] = useState<string[]>([]);

  const availableInstitutes = [
    {
      id: "nust",
      name: "NUST",
      fullName: "National University of Sciences and Technology",
      location: "Islamabad",
      rating: 4.8,
      students: 15000,
      fee: "PKR 180,000/year",
      programs: 45,
      ranking: "#1 Engineering",
    },
    {
      id: "lums",
      name: "LUMS",
      fullName: "Lahore University of Management Sciences",
      location: "Lahore",
      rating: 4.7,
      students: 5500,
      fee: "PKR 800,000/year",
      programs: 35,
      ranking: "#1 Business",
    },
    {
      id: "aku",
      name: "AKU",
      fullName: "Aga Khan University",
      location: "Karachi",
      rating: 4.9,
      students: 8000,
      fee: "PKR 2,500,000/year",
      programs: 28,
      ranking: "#1 Medical",
    },
  ];

  const addInstitute = (instituteId: string) => {
    if (selectedInstitutes.length < 3 && !selectedInstitutes.includes(instituteId)) {
      setSelectedInstitutes([...selectedInstitutes, instituteId]);
    }
  };

  const removeInstitute = (instituteId: string) => {
    setSelectedInstitutes(selectedInstitutes.filter(id => id !== instituteId));
  };

  const selectedData = selectedInstitutes.map(id =>
    availableInstitutes.find(inst => inst.id === id)
  ).filter(Boolean);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-foreground">Compare Institutes</h1>
          <p className="text-muted-foreground">
            Compare up to 3 institutes side by side to make an informed decision
          </p>
        </div>

        {selectedInstitutes.length < 3 && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1">
                  <label className="text-sm font-medium mb-2 block">Add Institute to Compare</label>
                  <Select onValueChange={addInstitute}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an institute" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableInstitutes
                        .filter(inst => !selectedInstitutes.includes(inst.id))
                        .map(inst => (
                          <SelectItem key={inst.id} value={inst.id}>
                            {inst.fullName}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="text-sm text-muted-foreground">
                  {selectedInstitutes.length}/3 institutes selected
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {selectedData.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedData.map((institute) => (
              <Card key={institute?.id} className="relative">
                <button
                  onClick={() => removeInstitute(institute?.id || "")}
                  className="absolute top-4 right-4 p-1 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>

                <div className="bg-gradient-to-br from-primary to-secondary h-32 flex items-center justify-center">
                  <div className="text-center text-primary-foreground">
                    <h3 className="text-2xl font-bold">{institute?.name}</h3>
                  </div>
                </div>

                <CardContent className="p-6 space-y-4">
                  <div>
                    <h4 className="font-semibold text-lg mb-1">{institute?.fullName}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{institute?.location}</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-border">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Rating</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-accent text-accent" />
                        <span className="font-semibold">{institute?.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Students</span>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="font-semibold">{institute?.students.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Average Fee</span>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="font-semibold text-sm">{institute?.fee}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Programs</span>
                      <span className="font-semibold">{institute?.programs}+</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Ranking</span>
                      <span className="font-semibold text-primary text-sm">{institute?.ranking}</span>
                    </div>
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary/90 mt-4">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}

            {Array.from({ length: 3 - selectedData.length }).map((_, index) => (
              <Card key={`empty-${index}`} className="border-dashed">
                <CardContent className="p-6 h-full flex items-center justify-center min-h-[400px]">
                  <div className="text-center text-muted-foreground">
                    <Plus className="h-12 w-12 mx-auto mb-2" />
                    <p>Add institute to compare</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-muted-foreground">
                <Plus className="h-16 w-16 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Start Comparing</h3>
                <p>Select institutes from the dropdown above to start comparing</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}





