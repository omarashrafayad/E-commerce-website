
import React from 'react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-800 rounded-2xl shadow-sm p-8 md:p-12">
                <header className="mb-12 text-center">
                    <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6">
                        <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        We value your trust and are committed to protecting your personal information.
                    </p>
                    <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                        Last Updated: January 2, 2026
                    </div>
                </header>

                <div className="space-y-12">
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Eye className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                                Information We Collect
                            </h2>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                            We collect information you provide directly to us when you create an account, make a purchase, or communicate with us. This includes:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 ml-4">
                            <li>Name and contact information</li>
                            <li>Billing and shipping addresses</li>
                            <li>Payment information (processed securely)</li>
                            <li>Order history and preferences</li>
                        </ul>
                    </section>

                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                                How We Use Your Data
                            </h2>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            We use the collected information to process your orders, improve our services, and communicate with you about promotions and updates. We do not sell your personal data to third parties.
                        </p>
                    </section>

                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Lock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                                Security Measures
                            </h2>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            We implement industry-standard security measures to ensure your data is safe. All payment transactions are encrypted using SSL technology.
                        </p>
                    </section>
                </div>

                <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-center text-gray-500 dark:text-gray-400">
                        If you have any questions about this policy, please contact us at <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">privacy@ecommerce.com</a>.
                    </p>
                </div>
            </div>
        </div>
    );
}
