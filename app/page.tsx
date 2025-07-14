"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Copy, Code2, ArrowRight } from "lucide-react"
import { convertCode } from "./actions"
import { useToast } from "@/hooks/use-toast"

const languages = [
  { value: "c", label: "C", color: "bg-blue-500" },
  { value: "java", label: "Java", color: "bg-orange-500" },
  { value: "python", label: "Python", color: "bg-green-500" },
]

export default function CodeConverter() {
  const [sourceCode, setSourceCode] = useState("")
  const [convertedCode, setConvertedCode] = useState("")
  const [sourceLanguage, setSourceLanguage] = useState("")
  const [targetLanguage, setTargetLanguage] = useState("")
  const [isConverting, setIsConverting] = useState(false)
  const { toast } = useToast()

  const handleConvert = async () => {
    if (!sourceCode.trim() || !sourceLanguage || !targetLanguage) {
      toast({
        title: "Missing Information",
        description: "Please provide source code and select both languages.",
        variant: "destructive",
      })
      return
    }

    if (sourceLanguage === targetLanguage) {
      toast({
        title: "Same Language",
        description: "Source and target languages cannot be the same.",
        variant: "destructive",
      })
      return
    }

    setIsConverting(true)
    try {
      const result = await convertCode(sourceCode, sourceLanguage, targetLanguage)
      setConvertedCode(result)
      toast({
        title: "Conversion Complete",
        description: "Your code has been successfully converted!",
      })
    } catch (error) {
      toast({
        title: "Conversion Failed",
        description: "An error occurred while converting your code. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsConverting(false)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: "Copied!",
        description: "Code copied to clipboard.",
      })
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy code to clipboard.",
        variant: "destructive",
      })
    }
  }

  const getLanguageInfo = (value: string) => {
    return languages.find((lang) => lang.value === value)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Code2 className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Code Converter</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transform your code between C, Java, and Python with AI-powered conversion. Maintain functionality while
            adapting to different language paradigms.
          </p>
        </div>

        {/* Language Selection */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="flex flex-col items-center gap-2">
            <label className="text-sm font-medium text-gray-700">From</label>
            <Select value={sourceLanguage} onValueChange={setSourceLanguage}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Source" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${lang.color}`} />
                      {lang.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <ArrowRight className="h-6 w-6 text-gray-400 mt-6" />

          <div className="flex flex-col items-center gap-2">
            <label className="text-sm font-medium text-gray-700">To</label>
            <Select value={targetLanguage} onValueChange={setTargetLanguage}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Target" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${lang.color}`} />
                      {lang.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Code Areas */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Source Code */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    Source Code
                    {sourceLanguage && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <div className={`w-2 h-2 rounded-full ${getLanguageInfo(sourceLanguage)?.color}`} />
                        {getLanguageInfo(sourceLanguage)?.label}
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription>Paste your code here to convert</CardDescription>
                </div>
                {sourceCode && (
                  <Button variant="outline" size="sm" onClick={() => copyToClipboard(sourceCode)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Enter your source code here..."
                value={sourceCode}
                onChange={(e) => setSourceCode(e.target.value)}
                className="min-h-[400px] font-mono text-sm"
              />
            </CardContent>
          </Card>

          {/* Converted Code */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    Converted Code
                    {targetLanguage && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <div className={`w-2 h-2 rounded-full ${getLanguageInfo(targetLanguage)?.color}`} />
                        {getLanguageInfo(targetLanguage)?.label}
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription>Your converted code will appear here</CardDescription>
                </div>
                {convertedCode && (
                  <Button variant="outline" size="sm" onClick={() => copyToClipboard(convertedCode)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Converted code will appear here..."
                value={convertedCode}
                readOnly
                className="min-h-[400px] font-mono text-sm bg-gray-50"
              />
            </CardContent>
          </Card>
        </div>

        {/* Convert Button */}
        <div className="text-center">
          <Button
            onClick={handleConvert}
            disabled={isConverting || !sourceCode.trim() || !sourceLanguage || !targetLanguage}
            size="lg"
            className="px-8"
          >
            {isConverting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Converting...
              </>
            ) : (
              <>
                <Code2 className="mr-2 h-4 w-4" />
                Convert Code
              </>
            )}
          </Button>
        </div>

        {/* Features */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">AI-Powered</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Uses advanced AI to understand code semantics and provide accurate conversions between different
                programming languages.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Multi-Language</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Supports conversion between C, Java, and Python with proper syntax and idiom adaptation.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Preserve Logic</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Maintains the original functionality while adapting to target language conventions and best practices.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
