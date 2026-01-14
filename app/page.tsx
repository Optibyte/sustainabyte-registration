"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MagicCard } from "@/components/ui/magic-card";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import {
  TrendingDown,
  Zap,
  Target,
  Leaf,
  Clock,
  ArrowRight,
  CheckCircle,
  Building2,
  Factory,
  Wrench,
  Droplets,
  Recycle,
} from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  buildingType: z.string().min(1, "Please select a building type"),
  challenges: z.string().min(1, "Please select your key challenges"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      buildingType: "",
      challenges: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/facility/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Consultation request submitted successfully!", {
          description: "We'll get back to you within 24-48 hours.",
        });
        form.reset();
      } else {
        const error = await response.json();
        toast.error("Failed to submit request", {
          description: error.error || "Please try again later.",
        });
      }
    } catch (error) {
      toast.error("Network error", {
        description: "Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = () => {
    const formSection = document.getElementById("consultation-form");
    formSection?.scrollIntoView({ behavior: "smooth" });
  };

  const benefits = [
    {
      icon: TrendingDown,
      title: "7–30% Energy Savings",
      description: "Reduce energy consumption and costs",
    },
    {
      icon: Target,
      title: "Enhanced operational efficiency",
      description: "Achieve optimized performance through automated controls.",
    },
    {
      icon: Leaf,
      title: "Reduction in Scope 1 & 2 emissions",
      description: "Seamlessly align with carbon neutrality goals",
    },
    {
      icon: Clock,
      title: "Headcount optimization",
      description: "1.5 hours of manual effort saved daily",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="relative bg-linear-to-r from-[#052657] to-[#4db846] text-white py-20 px-4 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 blur-sm"
          style={{
            backgroundImage: "url('/photo.avif')",
          }}
        ></div>
        <div className="relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <Reveal>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Smart Savings for a Sustainable Future
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-xl md:text-2xl italic mb-8 opacity-90">
                Your facility deserves to be EPIC.
              </p>
            </Reveal>
            <Reveal delay={400}>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {["Efficient", "Predictive", "Intelligent", "Controlled"].map(
                  (tag, index) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-base px-4 py-1 bg-white/20 text-white border-white/30 hover:bg-white/30"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {tag}
                    </Badge>
                  )
                )}
              </div>
            </Reveal>
            <Reveal delay={600}>
              <ShimmerButton
                onClick={scrollToForm}
                background="linear-gradient(90deg, #052657 0%, #4db846 100%)"
                shimmerColor="#ffffff"
                shimmerDuration="8s"
                className="shadow-2xl mx-auto"
              >
                <span className="text-center text-md font-bold text-white">
                  Book My Consultation
                </span>
              </ShimmerButton>
            </Reveal>
            <Reveal delay={800}>
              <p className="text-sm mt-4 opacity-75">
                Limited consultations available this month for select
                industries.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Reveal key={benefit.title} delay={index * 200}>
                <MagicCard
                  className="p-6 h-full glass-card border-0 bg-white rounded-lg"
                  gradientFrom="var(--brand-amber)"
                  gradientTo="var(--brand-gold)"
                  gradientColor="var(--brand-amber)"
                  gradientOpacity={0.15}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-linear-to-r from-[#052657] to-[#4db846] rounded-full flex items-center justify-center">
                      <benefit.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-[#052657]">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </MagicCard>
              </Reveal>
            ))}
          </div>
          <Reveal delay={800}>
            <p className="text-center mt-12 text-gray-600 max-w-2xl mx-auto">
              Outcomes validated through real-world audits and deployments
              across industries.
            </p>
          </Reveal>
        </div>
      </section>

      <section
        id="consultation-form"
        className="py-20 px-4 bg-linear-to-r from-[#052657] to-[#4db846] text-white"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Reveal>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Book Your Consultation - Let's Identify Your Facility's
                  Optimization Opportunities
                </h2>
              </Reveal>
              <Reveal delay={200}>
                <p className="text-lg mb-6 opacity-90">
                  In this one-hour discovery session, our experts will:
                </p>
              </Reveal>
              <Reveal delay={400}>
                <ul className="space-y-4">
                  {[
                    "Understand your facility's current setup, challenges, and priorities across HVAC, utilities, or sustainability goals.",
                    "Identify key focus areas where performance gaps or energy inefficiencies may exist.",
                    "Outline the next steps such as data collection or a site-level study to quantify your savings potential and compliance readiness.",
                    "Share relevant insights from similar projects to help you benchmark and plan your next actions confidently.",
                  ].map((point, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CheckCircle className="w-6 h-6 text-[#4db846] mt-1 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <div>
              <Reveal delay={600}>
                <MagicCard
                  className="p-8 bg-white text-gray-900 glass-card rounded-lg"
                  gradientFrom="var(--brand-amber)"
                  gradientTo="var(--brand-gold)"
                  gradientColor="var(--brand-amber)"
                  gradientOpacity={0.15}
                >
                  <h3 className="text-2xl font-semibold mb-6 text-[#052657]">
                    Tell us about your facility
                  </h3>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name*</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Your full name"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company / Facility Name*</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Your company name"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email*</FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="your.email@company.com"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Contact Number*</FormLabel>
                              <FormControl>
                                <PhoneInput
                                  defaultCountry="IN"
                                  placeholder="Enter phone number"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="buildingType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Building Type*</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select building type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="industry">
                                  Industry
                                </SelectItem>
                                <SelectItem value="commercial">
                                  Commercial building
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="challenges"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Key Challenges*</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select your main challenges" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="energy">
                                  Energy management
                                </SelectItem>
                                <SelectItem value="equipment">
                                  Equipment efficiency
                                </SelectItem>
                                <SelectItem value="water">
                                  Water management
                                </SelectItem>
                                <SelectItem value="emission">
                                  Emission management
                                </SelectItem>
                                <SelectItem value="decarbonization">
                                  Decarbonization
                                </SelectItem>
                                <SelectItem value="cost">
                                  Cost optimization
                                </SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message (Optional)</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us more about your facility, current challenges, or specific goals..."
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-linear-to-r from-[#052657] to-[#4db846] hover:from-[#4db846] hover:to-[#052657] text-white py-3 text-sm font-semibold disabled:opacity-50"
                      >
                        {isSubmitting
                          ? "Submitting..."
                          : "Schedule My Consultation"}
                      </Button>

                      <p className="text-sm text-gray-600 text-center">
                        Your data stays confidential. Our team will reach out
                        within 24–48 hours to confirm your slot.
                      </p>
                    </form>
                  </Form>
                </MagicCard>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Banner */}
      <section className="py-8 px-4 bg-[#052657] text-white text-center">
        <Reveal>
          <p className="text-lg font-semibold">
            Secure your slot before we close this month schedule
          </p>
        </Reveal>
      </section>
    </div>
  );
}
