
import BenefitsSection from "@/features/main/home/components/BenefitsSection";

export default function About() {
    return (
        <div className="bg-white dark:bg-zinc-950">
            {/* Hero Section */}
            <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
                <div
                    className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
                    aria-hidden="true"
                >
                    <div
                        className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">About Us</h2>
                        <p className="mt-6 text-lg leading-8 text-gray-300">
                            We are reimagining the way you shop online. Quality, transparency, and customer satisfaction are at the heart of everything we do.
                        </p>
                    </div>
                </div>
            </div>

            {/* Mission Section */}
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
                <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:items-center">
                    <div>
                        <h3 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">Our Mission</h3>
                        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                            Our mission is to provide an accessible, seamless, and enjoyable shopping experience for everyone. We believe that high-quality products shouldn't come with a high price tag or a complicated checkout process.
                        </p>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            We source our products from trusted manufacturers and partners around the globe to ensure that every item you receive meets our strict quality standards.
                        </p>
                    </div>
                    <div className="mt-10 lg:mt-0">
                        <img
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000"
                            alt="Team working together"
                            className="rounded-xl shadow-2xl ring-1 ring-gray-900/10"
                        />
                    </div>
                </div>
            </div>

            {/* Values Section */}
            <BenefitsSection />

        </div>
    );
}
