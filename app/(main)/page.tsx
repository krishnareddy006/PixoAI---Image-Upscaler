"use client";

import { useState, useEffect } from "react";
import { LandingModal } from "@/components/LandingModal";
import { ImageUploader } from "@/components/ImageUploader";
import { ImageComparison } from "@/components/ImageComparison";
import { UpgradeBox } from "@/components/UpgradeBox";
import { HowItWorks } from "@/components/HowItWorks";
import { Features } from "@/components/Features";
import { Testimonials } from "@/components/Testimonials";
import { FAQAccordion } from "@/components/FAQAccordion";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-hot-toast";

interface UpscaleResult {
  originalImage: string;
  upscaledImage: string;
  scaleFactor: 2 | 4;
  creditsRemaining: number;
}

export default function HomePage() {
  const { isLoaded, isSignedIn } = useUser();
  const [uploadedImage, setUploadedImage] = useState<string>("");
  const [upscaleResult, setUpscaleResult] = useState<UpscaleResult | null>(null);
  const [scaleFactor, setScaleFactor] = useState<2 | 4>(2);
  const [isProcessing, setIsProcessing] = useState(false);
  const [credits, setCredits] = useState(0);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (isSignedIn) {
      fetchCredits();
    }
  }, [isSignedIn]);

  const fetchCredits = async () => {
    try {
      const res = await fetch("/api/user/credits");
      if (res.ok) {
        const data = await res.json();
        setCredits(data.credits);
      }
    } catch (error) {
      console.error("Error fetching credits:", error);
    }
  };

  const handleImageUpload = async (file: File, base64: string) => {
    if (!isSignedIn) {
      toast.error("Please sign in to upscale images");
      return;
    }

    // Validate file type
    const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!validTypes.includes(file.type)) {
      toast.error("Invalid file type. Please upload PNG, JPG, JPEG, or WebP");
      return;
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error("File too large. Maximum size is 10MB");
      return;
    }

    setUploadedImage(base64);
    setImageFile(file);
    setUpscaleResult(null);

    if (credits <= 0) {
      toast.error("No credits available. Please upgrade.");
      return;
    }

    try {
      setIsProcessing(true);

      const formData = new FormData();
      formData.append("image", file);
      formData.append("scaleFactor", scaleFactor.toString());

      const res = await fetch("/api/upscale", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Upscaling failed");
      }

      // Get the image blob
      const blob = await res.blob();
      const upscaledUrl = URL.createObjectURL(blob);

      setUpscaleResult({
        originalImage: base64,
        upscaledImage: upscaledUrl,
        scaleFactor,
        creditsRemaining: credits - 1,
      });

      setCredits(credits - 1);
      toast.success("Image upscaled successfully!");

      // Refresh credits
      fetchCredits();
    } catch (error) {
      console.error("Upscale error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to upscale image"
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleScaleChange = async (newScale: 2 | 4) => {
    if (newScale === scaleFactor) return;
    if (!isSignedIn) {
      toast.error("Please sign in to change scale");
      return;
    }

    if (credits <= 0) {
      toast.error("No credits available. Please upgrade.");
      return;
    }

    if (!imageFile) {
      toast.error("No image uploaded");
      return;
    }

    setScaleFactor(newScale);

    if (uploadedImage && !isProcessing) {
      try {
        setIsProcessing(true);

        const formData = new FormData();
        formData.append("image", imageFile);
        formData.append("scaleFactor", newScale.toString());

        const res = await fetch("/api/upscale", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.error || "Upscaling failed");
        }

        // Get the image blob
        const blob = await res.blob();
        const upscaledUrl = URL.createObjectURL(blob);

        setUpscaleResult({
          originalImage: uploadedImage,
          upscaledImage: upscaledUrl,
          scaleFactor: newScale,
          creditsRemaining: credits - 1,
        });

        setCredits(credits - 1);
        toast.success(`Upscaled to ${newScale}x!`);

        // Refresh credits
        fetchCredits();
      } catch (error) {
        console.error("Scale change error:", error);
        toast.error("Failed to change scale factor");
      } finally {
        setIsProcessing(false);
      }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Show Landing Modal only when not signed in */}
      {isLoaded && !isSignedIn && <LandingModal />}

      {/* Hero Section */}
      <section className="pt-16 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-gray-800 dark:text-indigo-400">AI Image Upscaler</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
            Transform your images with cutting-edge AI technology. Enhance
            resolution, restore details, and achieve professional-quality
            results in seconds.
          </p>
        </div>
      </section>

      {/* Upload Section - Show only when signed in */}
      {isLoaded && isSignedIn && (
        <>
          <section className="py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* ImageUploader should always be visible */}
                <ImageUploader
                onImageUpload={handleImageUpload}
                isLoading={isProcessing}
                />
            </div>
          </section>

          {/* Comparison & Upgrade Section */}
              <section className="py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    {credits === 0 ? (
                    <UpgradeBox />
                    ) : (
                    uploadedImage &&
                    upscaleResult && (
                        <ImageComparison
                        originalImage={upscaleResult.originalImage}
                        upscaledImage={upscaleResult.upscaledImage}
                        scaleFactor={upscaleResult.scaleFactor}
                        onScaleChange={handleScaleChange}
                        isProcessing={isProcessing}
                        />
                    )
                    )}
                </div>
              </section>
            </>
            )}

      {/* How It Works */}
      <HowItWorks />

      {/* Features */}
      <Features />

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ */}
      <FAQAccordion />
    </div>
  );
}
