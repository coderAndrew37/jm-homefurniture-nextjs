"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

export default function CustomDesign() {
  type CustomFormData = {
    projectType: string;
    dimensions: string;
    materials: string;
    style: string;
    budget: string;
    timeline: string;
    description: string;
    referenceImages: File[];
  };

  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<CustomFormData>({
    projectType: "",
    dimensions: "",
    materials: "",
    style: "",
    budget: "",
    timeline: "",
    description: "",
    referenceImages: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      referenceImages: [...prev.referenceImages, ...files],
    }));
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      referenceImages: prev.referenceImages.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Handle form submission here
    console.log("Form submitted:", formData);
    setIsSubmitting(false);
    setStep(5); // Success step
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const projectTypes = [
    { value: "sofa", label: "Sofa & Seating" },
    { value: "table", label: "Table & Desk" },
    { value: "storage", label: "Storage & Cabinets" },
    { value: "bed", label: "Bed & Bedroom" },
    { value: "dining", label: "Dining Set" },
    { value: "other", label: "Other Furniture" },
  ];

  const styles = [
    { value: "modern", label: "Modern" },
    { value: "rustic", label: "Rustic" },
    { value: "industrial", label: "Industrial" },
    { value: "scandinavian", label: "Scandinavian" },
    { value: "traditional", label: "Traditional Kenyan" },
    { value: "fusion", label: "Fusion" },
  ];

  const budgets = [
    { value: "15-25k", label: "KSh 15,000 - 25,000" },
    { value: "25-50k", label: "KSh 25,000 - 50,000" },
    { value: "50-100k", label: "KSh 50,000 - 100,000" },
    { value: "100k+", label: "KSh 100,000+" },
    { value: "custom", label: "Custom Quote" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <Link href="/" className="text-2xl font-light text-gray-900">
            Kenyan Elegance
          </Link>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between py-8">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNumber
                      ? "bg-amber-500 text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {stepNumber}
                </div>
                {stepNumber < 4 && (
                  <div
                    className={`w-16 h-0.5 mx-4 ${
                      step > stepNumber ? "bg-amber-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 py-12 max-w-4xl">
        {/* Step 1: Project Type */}
        {step === 1 && (
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-light text-gray-900 mb-4">
              What would you like to create?
            </h1>
            <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
              Select the type of furniture piece you have in mind. Our artisans
              will work with you to bring your vision to life.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
              {projectTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => {
                    handleInputChange("projectType", type.value);
                    nextStep();
                  }}
                  className="p-6 border-2 border-gray-200 hover:border-amber-400 hover:bg-amber-50 rounded-lg transition-all duration-300 group"
                >
                  <div className="text-2xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {type.value === "sofa" && "🛋️"}
                    {type.value === "table" && "🪑"}
                    {type.value === "storage" && "🗄️"}
                    {type.value === "bed" && "🛏️"}
                    {type.value === "dining" && "🍽️"}
                    {type.value === "other" && "✨"}
                  </div>
                  <h3 className="font-medium text-gray-900">{type.label}</h3>
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(4)}
              className="text-gray-500 hover:text-gray-700 underline text-sm"
            >
              Skip to contact form
            </button>
          </div>
        )}

        {/* Step 2: Details */}
        {step === 2 && (
          <div>
            <h1 className="text-3xl sm:text-4xl font-light text-gray-900 mb-4">
              Tell us about your vision
            </h1>
            <p className="text-gray-600 mb-8">
              The more details you provide, the better we can understand your
              needs.
            </p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dimensions (optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g., 200cm length × 90cm width × 80cm height"
                  value={formData.dimensions}
                  onChange={(e) =>
                    handleInputChange("dimensions", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Materials (optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g., Solid oak, leather upholstery, brass details"
                  value={formData.materials}
                  onChange={(e) =>
                    handleInputChange("materials", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Design Style
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {styles.map((styleItem) => (
                    <button
                      key={styleItem.value}
                      type="button"
                      onClick={() =>
                        handleInputChange("style", styleItem.value)
                      }
                      className={`p-3 border rounded-lg text-sm transition-all ${
                        formData.style === styleItem.value
                          ? "border-amber-400 bg-amber-50 text-amber-700"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {styleItem.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  onClick={prevStep}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                >
                  Back
                </button>
                <button
                  onClick={nextStep}
                  className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-all flex-1"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Reference Images */}
        {step === 3 && (
          <div>
            <h1 className="text-3xl sm:text-4xl font-light text-gray-900 mb-4">
              Share your inspiration
            </h1>
            <p className="text-gray-600 mb-8">
              Upload photos, sketches, or any reference images that inspire your
              design.
            </p>

            <div className="space-y-6">
              {/* File Upload Area */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-amber-400 hover:bg-amber-50 cursor-pointer transition-all group"
              >
                <div className="text-4xl mb-4 text-gray-400 group-hover:text-amber-400">
                  📸
                </div>
                <p className="text-gray-600 mb-2">Click to upload images</p>
                <p className="text-sm text-gray-500">
                  PNG, JPG up to 10MB each
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              {/* Uploaded Images Preview */}
              {formData.referenceImages.length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-700 mb-4">
                    Uploaded Images ({formData.referenceImages.length})
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {formData.referenceImages.map((file, index) => (
                      <div key={index} className="relative group">
                        <Image
                          src={URL.createObjectURL(file)}
                          alt={`Reference ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-sm hover:bg-red-600 transition-all"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-4 pt-6">
                <button
                  onClick={prevStep}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                >
                  Back
                </button>
                <button
                  onClick={nextStep}
                  className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-all flex-1"
                >
                  Continue to Final Details
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Contact & Final Details */}
        {step === 4 && (
          <div>
            <h1 className="text-3xl sm:text-4xl font-light text-gray-900 mb-4">
              Almost there!
            </h1>
            <p className="text-gray-600 mb-8">
              Share your contact information and final details so we can get in
              touch.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number (optional)
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget Range
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {budgets.map((budget) => (
                    <button
                      key={budget.value}
                      type="button"
                      onClick={() => handleInputChange("budget", budget.value)}
                      className={`p-3 border rounded-lg text-sm transition-all ${
                        formData.budget === budget.value
                          ? "border-amber-400 bg-amber-50 text-amber-700"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {budget.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Description
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us more about your project, any specific requirements, or the story behind this piece..."
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition-all resize-none"
                />
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 disabled:bg-amber-300 transition-all flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Request"
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 5: Success */}
        {step === 5 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">✓</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-light text-gray-900 mb-4">
              Request Submitted!
            </h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Thank you for your custom design request. Our master artisans will
              review your project and contact you within 24-48 hours to discuss
              next steps.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
              >
                Back to Home
              </Link>
              <Link
                href="/shop"
                className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-all"
              >
                Browse Ready-made Pieces
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Benefits Section */}
      {step < 5 && (
        <div className="border-t border-gray-100 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 py-12">
            <h2 className="text-2xl font-light text-center text-gray-900 mb-8">
              Why Choose Custom Design?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-2xl mb-3">🎨</div>
                <h3 className="font-medium text-gray-900 mb-2">
                  Personalized Design
                </h3>
                <p className="text-gray-600 text-sm">
                  Every piece is tailored to your exact specifications and style
                  preferences.
                </p>
              </div>
              <div>
                <div className="text-2xl mb-3">🛠️</div>
                <h3 className="font-medium text-gray-900 mb-2">
                  Master Craftsmanship
                </h3>
                <p className="text-gray-600 text-sm">
                  Handcrafted by skilled Kenyan artisans using traditional
                  techniques.
                </p>
              </div>
              <div>
                <div className="text-2xl mb-3">💎</div>
                <h3 className="font-medium text-gray-900 mb-2">
                  Premium Materials
                </h3>
                <p className="text-gray-600 text-sm">
                  Sustainably sourced hardwoods and premium materials
                  guaranteed.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
