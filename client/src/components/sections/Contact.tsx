import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { MapPin, Phone } from "lucide-react";

const WEB3FORMS_URL = "https://api.web3forms.com/submit";
const SUPPORT_EMAIL = "support@nccabinetsource.com";
/** ~2k URL cap for mailto: on common mail clients */
const MAILTO_MAX_LEN = 1850;

function openMailtoComposer(values: z.infer<typeof formSchema>) {
  const subject = encodeURIComponent(`Website inquiry from ${values.name}`);
  const prefix = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=`;
  let body =
    `Name: ${values.name}\nEmail: ${values.email}\nPhone: ${values.phone}\n\n${values.message}\n\n---\nSent via nccabinetsource.com contact form`;
  let encoded = encodeURIComponent(body);
  while (encoded.length > MAILTO_MAX_LEN - prefix.length && body.length > 80) {
    body = `${body.slice(0, Math.floor(body.length * 0.85)).trim()}\n…(message truncated)`;
    encoded = encodeURIComponent(body);
  }
  const href = prefix + encoded;
  const a = document.createElement("a");
  a.href = href;
  a.rel = "noopener noreferrer";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim();

    const finishWithMailto = (title: string, description: string) => {
      openMailtoComposer(values);
      toast({ title, description });
    };

    if (accessKey) {
      setIsSubmitting(true);
      try {
        const res = await fetch(WEB3FORMS_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: accessKey,
            subject: "NC Cabinet Source — Website contact form",
            from_name: values.name,
            name: values.name,
            email: values.email,
            replyto: values.email,
            phone: values.phone,
            message: values.message,
          }),
        });

        const data = (await res.json()) as { success?: boolean; message?: string };

        if (res.ok && data.success) {
          toast({
            title: "Message sent",
            description: "We'll get back to you shortly regarding your project.",
          });
          form.reset();
          return;
        }
        throw new Error(data.message || "Something went wrong");
      } catch {
        finishWithMailto(
          "Opening your email app",
          `We couldn't send in the background. A draft to ${SUPPORT_EMAIL} should open — tap Send when it looks right.`,
        );
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    finishWithMailto(
      "Open your email app",
      `A draft message to ${SUPPORT_EMAIL} should open. Tap Send to deliver your inquiry.`,
    );
  }

  return (
    <section id="contact" className="py-24 bg-slate-900 text-white relative">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-gray-400 text-lg mb-8">
            Get a free layout and consultation today. Fill out the form below and we'll reach out.
          </p>

          <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 text-gray-300">
             <a 
               href="https://www.google.com/maps/search/?api=1&query=1818+U.S.+Hwy+70+SW,+Hickory,+NC+28602" 
               target="_blank" 
               rel="noopener noreferrer"
               className="flex items-center gap-2 hover:text-primary transition-colors group"
             >
               <div className="bg-white/10 p-2 rounded-full group-hover:bg-primary transition-colors">
                 <MapPin className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
               </div>
               <span className="text-left">1818 U.S. Hwy 70 SW,<br className="md:hidden"/> Hickory, NC 28602</span>
             </a>
             
             <a href="tel:8284141058" className="flex items-center gap-2 hover:text-primary transition-colors group">
               <div className="bg-white/10 p-2 rounded-full group-hover:bg-primary transition-colors">
                 <Phone className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
               </div>
               <span>(828) 414-1058</span>
             </a>
          </div>
        </div>

        <div className="bg-white text-gray-900 p-8 md:p-12 rounded-2xl shadow-2xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} className="bg-gray-50 border-gray-200" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john@example.com" {...field} className="bg-gray-50 border-gray-200" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="(828) 414-1058" {...field} className="bg-gray-50 border-gray-200" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Details</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Tell us about your kitchen, bath, or outdoor project..." 
                        className="min-h-[120px] bg-gray-50 border-gray-200" 
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
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6 text-lg rounded-lg transition-all transform hover:scale-[1.01] disabled:opacity-70 disabled:transform-none"
              >
                {isSubmitting ? "Sending…" : "Send Message"}
              </Button>
              {!import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim() && (
                <p className="text-center text-sm text-gray-500">
                  This opens your email app with a message to {SUPPORT_EMAIL}. If nothing opens, email us directly.
                </p>
              )}
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
