import { useState } from 'react'
import { Database, Shield, Code, Server, Globe, Menu, X, Phone, Mail, MapPin, ChevronRight } from 'lucide-react'
import logoImage from './assets/images/logo.png'
import heroImage from './assets/images/hero-tech.png'
import databaseImage from './assets/images/database.png'
import cybersecurityImage from './assets/images/cybersecurity.jpg'
import infrastructureImage from './assets/images/infrastructure.jpg'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const services = [
    {
      icon: Database,
      title: "إدارة وتطوير قواعد البيانات",
      titleEn: "Database Management & Development",
      description: "إدارة قواعد بيانات PostgreSQL، ضمان سلامة البيانات، حلول النسخ الاحتياطي والاستعادة، وتحسين الأداء",
      descriptionEn: "PostgreSQL database management, data integrity, backup and recovery solutions, and performance optimization",
      image: databaseImage
    },
    {
      icon: Shield,
      title: "خدمات الأمن السيبراني",
      titleEn: "Cybersecurity Services",
      description: "إدارة أمن المعلومات، الامتثال للأمن السيبراني، الاستجابة للحوادث الأمنية، وتقييم وتخفيف المخاطر",
      descriptionEn: "Information security management, cybersecurity compliance, security incident response, and risk assessment",
      image: cybersecurityImage
    },
    {
      icon: Code,
      title: "تطوير البرمجيات",
      titleEn: "Software Development",
      description: "تطوير وتكامل أنظمة ERP، حلول برمجية مخصصة، تحديث الأنظمة، وضمان الجودة والاختبار",
      descriptionEn: "ERP system development and integration, custom software solutions, system modernization, and quality assurance",
      image: cybersecurityImage
    },
    {
      icon: Server,
      title: "البنية التحتية لتقنية المعلومات والدعم",
      titleEn: "IT Infrastructure & Support",
      description: "صيانة ومراقبة الأنظمة، خدمات الدعم التقني، تحسين البنية التحتية، وخدمات المراقبة على مدار الساعة",
      descriptionEn: "System maintenance and monitoring, technical support services, infrastructure optimization, and 24/7 monitoring",
      image: infrastructureImage
    }
  ]

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitMessage('تم إرسال الرسالة بنجاح! سنتواصل معك قريباً.')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setSubmitMessage('حدث خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى.')
      }
    } catch (error) {
      setSubmitMessage('حدث خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى.')
    }

    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-background text-foreground tajawal">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <img src={logoImage} alt="التطور التكنولوجي" className="h-10 w-auto" />
            <span className="text-xl font-bold">التطور التكنولوجي</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
            <button onClick={() => scrollToSection('home')} className="text-sm font-medium hover:text-primary transition-colors">
              الرئيسية
            </button>
            <button onClick={() => scrollToSection('services')} className="text-sm font-medium hover:text-primary transition-colors">
              الخدمات
            </button>
            <button onClick={() => scrollToSection('about')} className="text-sm font-medium hover:text-primary transition-colors">
              من نحن
            </button>
            <button onClick={() => scrollToSection('security')} className="text-sm font-medium hover:text-primary transition-colors">
              الأمان
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-sm font-medium hover:text-primary transition-colors">
              اتصل بنا
            </button>
          </nav>

          {/* Service Icons */}
          <div className="hidden lg:flex items-center space-x-2 rtl:space-x-reverse">
            <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg">
              <Database className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
              <Shield className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-lg">
              <Code className="w-5 h-5 text-orange-600" />
            </div>
            <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg">
              <Server className="w-5 h-5 text-purple-600" />
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <nav className="container py-4 space-y-2">
              <button onClick={() => scrollToSection('home')} className="block w-full text-right py-2 text-sm font-medium hover:text-primary transition-colors">
                الرئيسية
              </button>
              <button onClick={() => scrollToSection('services')} className="block w-full text-right py-2 text-sm font-medium hover:text-primary transition-colors">
                الخدمات
              </button>
              <button onClick={() => scrollToSection('about')} className="block w-full text-right py-2 text-sm font-medium hover:text-primary transition-colors">
                من نحن
              </button>
              <button onClick={() => scrollToSection('security')} className="block w-full text-right py-2 text-sm font-medium hover:text-primary transition-colors">
                الأمان
              </button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-right py-2 text-sm font-medium hover:text-primary transition-colors">
                اتصل بنا
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="py-20 lg:py-32">
        <div className="container">
          <div className="text-center space-y-8">
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              التطور التكنولوجي
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              نتشرف بتقديم خدماتنا التقنية المتميزة بأعلى معايير الجودة وأفضل الممارسات العالمية. 
              نحن متخصصون في تطوير وإدارة الأنظمة التقنية والأمن السيبراني.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => scrollToSection('services')}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-lg font-medium transition-colors"
              >
                استكشف خدماتنا
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="border border-input bg-background hover:bg-accent hover:text-accent-foreground px-8 py-3 rounded-lg font-medium transition-colors"
              >
                تواصل معنا
              </button>
            </div>
          </div>
          
          <div className="mt-16">
            <img 
              src={heroImage} 
              alt="التطور التكنولوجي" 
              className="w-full max-w-4xl mx-auto rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">خدماتنا المتخصصة</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              نقدم مجموعة شاملة من الخدمات التقنية المتطورة لتلبية احتياجات عملائنا
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-card text-card-foreground rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start space-x-4 rtl:space-x-reverse mb-6">
                  <div className="flex-shrink-0">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{service.titleEn}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{service.descriptionEn}</p>
                  
                  <button className="inline-flex items-center text-primary hover:text-primary/80 font-medium">
                    اعرف المزيد
                    <ChevronRight className="w-4 h-4 mr-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-8">من نحن</h2>
            
            <div className="text-center mb-12">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                نحن مؤسسة متخصصة في تقديم الحلول التقنية المتطورة والخدمات المتميزة في مجال تقنية المعلومات والأمن السيبراني. 
                نتمتع بخبرة واسعة وفريق متخصص يضمن تقديم أفضل الخدمات لعملائنا.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                نؤمن بأن مفتاح النجاح يكمن في التميز والجودة، والذي يضمن رضا عملائنا وتحقيق أهدافهم التقنية بكفاءة عالية.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">معايير جودة عالية</h3>
                <p className="text-sm text-muted-foreground">نلتزم بأعلى معايير الجودة وأفضل الممارسات العالمية</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">فريق خبير</h3>
                <p className="text-sm text-muted-foreground">فريق تقني متخصص ذو كفاءة عالية وخبرة واسعة</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Database className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">تدابير أمنية شاملة</h3>
                <p className="text-sm text-muted-foreground">حلول أمنية متقدمة تضمن حماية البيانات والأنظمة</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Server className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">التحسين المستمر</h3>
                <p className="text-sm text-muted-foreground">منهجية عمل متقدمة تضمن التطوير والتحسين المستمر</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-20 bg-muted/50">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">الأمان والامتثال</h2>
            <p className="text-lg text-muted-foreground mb-12">
              نلتزم بأعلى معايير الأمان والحماية لضمان سلامة بياناتكم وأنظمتكم
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">حماية البيانات</h3>
                <p className="text-sm text-muted-foreground">تطبيق أحدث تقنيات الحماية والتشفير لضمان أمان البيانات</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Database className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">الامتثال للمعايير</h3>
                <p className="text-sm text-muted-foreground">الالتزام بالمعايير الدولية ومتطلبات الحماية السيبرانية</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Server className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">المراقبة المستمرة</h3>
                <p className="text-sm text-muted-foreground">مراقبة الأنظمة على مدار الساعة للكشف المبكر عن التهديدات</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-8">تواصل معنا</h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              نحن هنا لمساعدتكم في تحقيق أهدافكم التقنية
            </p>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <h3 className="text-2xl font-semibold mb-6">معلومات التواصل</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold">العنوان</h4>
                    <p className="text-muted-foreground">صندوق بريد 229 - سكاكا - المملكة العربية السعودية</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold">الهاتف</h4>
                    <p className="text-muted-foreground">0590409111</p>
                    <p className="text-muted-foreground">0547247562</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold">البريد الإلكتروني</h4>
                    <p className="text-muted-foreground">altatawar@altatawar.com</p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <h3 className="text-2xl font-semibold mb-6">أرسل لنا رسالة</h3>
                <p className="text-muted-foreground mb-6">سنتواصل معك في أقرب وقت ممكن</p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">الاسم</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">البريد الإلكتروني</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">الموضوع</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">الرسالة</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 px-6 py-3 rounded-md font-medium transition-colors"
                  >
                    {isSubmitting ? 'جاري الإرسال...' : 'إرسال الرسالة'}
                  </button>
                  
                  {submitMessage && (
                    <div className={`p-4 rounded-md ${submitMessage.includes('بنجاح') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                      {submitMessage}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
                <img src={logoImage} alt="التطور التكنولوجي" className="h-8 w-auto" />
                <span className="text-lg font-bold">التطور التكنولوجي</span>
              </div>
              <p className="text-primary-foreground/80 text-sm">
                نتشرف بتقديم خدماتنا التقنية المتميزة بأعلى معايير الجودة وأفضل الممارسات العالمية.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">روابط سريعة</h3>
              <div className="space-y-2">
                <button onClick={() => scrollToSection('home')} className="block text-primary-foreground/80 hover:text-primary-foreground text-sm">
                  الرئيسية
                </button>
                <button onClick={() => scrollToSection('services')} className="block text-primary-foreground/80 hover:text-primary-foreground text-sm">
                  الخدمات
                </button>
                <button onClick={() => scrollToSection('about')} className="block text-primary-foreground/80 hover:text-primary-foreground text-sm">
                  من نحن
                </button>
                <button onClick={() => scrollToSection('contact')} className="block text-primary-foreground/80 hover:text-primary-foreground text-sm">
                  اتصل بنا
                </button>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">معلومات التواصل</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Phone className="w-4 h-4" />
                  <span className="text-primary-foreground/80">0590409111, 0547247562</span>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Mail className="w-4 h-4" />
                  <span className="text-primary-foreground/80">altatawar@altatawar.com</span>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <MapPin className="w-4 h-4" />
                  <span className="text-primary-foreground/80">صندوق بريد 229 - سكاكا - المملكة العربية السعودية</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
            <p className="text-primary-foreground/80">
              © 2024 التطور التكنولوجي. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

