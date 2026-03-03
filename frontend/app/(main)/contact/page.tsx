"use client";

import { Mail, MapPin, Phone, Send } from "lucide-react";

export default function Contact() {
    return (
        <div className="bg-white dark:bg-zinc-950">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Get in touch</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Have a question or feedback? We'd love to hear from you. Fill out the form below or reach out to us directly.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Contact Form */}
                    <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-8 border border-border">
                        <form action="#" method="POST" className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-foreground">
                                    Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        autoComplete="name"
                                        className="block w-full rounded-md border-0 py-2 text-foreground shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 bg-background px-3"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-foreground">
                                    Email
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        autoComplete="email"
                                        className="block w-full rounded-md border-0 py-2 text-foreground shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 bg-background px-3"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium leading-6 text-foreground">
                                    Message
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        name="message"
                                        id="message"
                                        rows={4}
                                        className="block w-full rounded-md border-0 py-2 text-foreground shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 bg-background px-3"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-primary px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 items-center gap-2"
                            >
                                Send Message <Send className="size-4" />
                            </button>
                        </form>
                    </div>

                    {/* Info */}
                    <div className="flex flex-col justify-center space-y-10">
                        <div>
                            <h3 className="text-xl font-bold text-foreground mb-4">Contact Information</h3>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <Mail className="size-6" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-foreground">Email</p>
                                        <p className="text-muted-foreground">support@ecommerce.com</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <Phone className="size-6" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-foreground">Phone</p>
                                        <p className="text-muted-foreground">+1 (555) 123-4567</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <MapPin className="size-6" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-foreground">Office</p>
                                        <p className="text-muted-foreground">123 Commerce St, Tech City, USA</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-foreground mb-4">FAQ</h3>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-semibold text-foreground">What is your return policy?</h4>
                                    <p className="text-muted-foreground text-sm mt-1">We offer a 30-day money-back guarantee on all eligible items. Returns are processed within 5-7 business days.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-foreground">Do you ship internationally?</h4>
                                    <p className="text-muted-foreground text-sm mt-1">Yes, we ship to over 100 countries worldwide. Shipping rates will be calculated at checkout.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
