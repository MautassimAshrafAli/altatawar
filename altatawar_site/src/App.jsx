import { useState, useEffect } from 'react'
import './App.css'
import logoImage from './assets/images/logo.png'
import heroImage from './assets/images/hero-tech.png'
import databaseImage from './assets/images/database.png'
import cybersecurityImage from './assets/images/cybersecurity.jpg'
import infrastructureImage from './assets/images/infrastructure.jpg'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'about', 'security', 'contact']
      const scrollPosition = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i])
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setActiveSection(sectionId)
    setIsMenuOpen(false)
  }

  const services = [
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3"/>
          <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/>
          <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/>
        </svg>
      ),
      title: "إدارة وتطوير قواعد البيانات",
      titleEn: "Database Management & Development",
      description: "إدارة قواعد بيانات PostgreSQL، ضمان سلامة البيانات، حلول النسخ الاحتياطي والاستعادة، وتحسين الأداء",
      descriptionEn: "PostgreSQL database management, data integrity, backup and recovery solutions, and performance optimization",
      image: databaseImage
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
        </svg>
      ),
      title: "خدمات الأمن السيبراني",
      titleEn: "Cybersecurity Services",
      description: "إدارة أمن المعلومات، الامتثال للأمن السيبراني، الاستجابة للحوادث الأمنية، وتقييم وتخفيف المخاطر",
      descriptionEn: "Information security management, cybersecurity compliance, security incident response, and risk assessment",
      image: cybersecurityImage
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6"/>
          <polyline points="8 6 2 12 8 18"/>
        </svg>
      ),
      title: "تطوير البرمجيات",
      titleEn: "Software Development",
      description: "تطوير وتكامل أنظمة ERP، حلول برمجية مخصصة، تحديث الأنظمة، وضمان الجودة والاختبار",
      descriptionEn: "ERP system development and integration, custom software solutions, system modernization, and quality assurance",
      image: databaseImage
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
          <line x1="8" y1="21" x2="16" y2="21"/>
          <line x1="12" y1="17" x2="12" y2="21"/>
        </svg>
      ),
      title: "البنية التحتية لتقنية المعلومات والدعم",
      titleEn: "IT Infrastructure & Support",
      description: "صيانة ومراقبة الأنظمة، خدمات الدعم التقني، تحسين البنية التحتية، وخدمات المراقبة على مدار الساعة",
      descriptionEn: "System maintenance and monitoring, technical support services, infrastructure optimization, and 24/7 monitoring",
      image: infrastructureImage
    }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSubmitMessage('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      setSubmitMessage('حدث خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى.')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitMessage(''), 5000)
    }
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo-section">
              <img src={logoImage} alt="التطور التكنولوجي" className="logo" />
              <h1 className="company-name">التطور التكنولوجي</h1>
            </div>
            
            <nav className="nav-desktop">
              <button 
                className={`nav-button ${activeSection === 'home' ? 'active' : ''}`}
                onClick={() => scrollToSection('home')}
              >
                الرئيسية
              </button>
              <button 
                className={`nav-button ${activeSection === 'services' ? 'active' : ''}`}
                onClick={() => scrollToSection('services')}
              >
                الخدمات
              </button>
              <button 
                className={`nav-button ${activeSection === 'about' ? 'active' : ''}`}
                onClick={() => scrollToSection('about')}
              >
                من نحن
              </button>
              <button 
                className={`nav-button ${activeSection === 'security' ? 'active' : ''}`}
                onClick={() => scrollToSection('security')}
              >
                الأمان
              </button>
              <button 
                className={`nav-button ${activeSection === 'contact' ? 'active' : ''}`}
                onClick={() => scrollToSection('contact')}
              >
                اتصل بنا
              </button>
            </nav>

            <button 
              className="mobile-menu-button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {isMenuOpen && (
            <nav className="nav-mobile">
              <button 
                className="nav-button-mobile"
                onClick={() => scrollToSection('home')}
              >
                الرئيسية
              </button>
              <button 
                className="nav-button-mobile"
                onClick={() => scrollToSection('services')}
              >
                الخدمات
              </button>
              <button 
                className="nav-button-mobile"
                onClick={() => scrollToSection('about')}
              >
                من نحن
              </button>
              <button 
                className="nav-button-mobile"
                onClick={() => scrollToSection('security')}
              >
                الأمان
              </button>
              <button 
                className="nav-button-mobile"
                onClick={() => scrollToSection('contact')}
              >
                اتصل بنا
              </button>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">التطور التكنولوجي</h1>
              <p className="hero-subtitle">
                نتشرف بتقديم خدماتنا التقنية المتميزة بأعلى معايير الجودة وأفضل الممارسات العالمية.
              </p>
              <p className="hero-description">
                نحن متخصصون في تطوير وإدارة الأنظمة التقنية والأمن السيبراني.
              </p>
              <div className="hero-buttons">
                <button 
                  className="btn-primary"
                  onClick={() => scrollToSection('services')}
                >
                  استكشف خدماتنا
                </button>
                <button 
                  className="btn-secondary"
                  onClick={() => scrollToSection('contact')}
                >
                  تواصل معنا
                </button>
              </div>
            </div>
            <div className="hero-image">
              <img src={heroImage} alt="Technology Solutions" className="hero-img" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">خدماتنا المتخصصة</h2>
            <p className="section-subtitle">
              نقدم مجموعة شاملة من الخدمات التقنية المتطورة لتلبية احتياجات عملائنا
            </p>
          </div>
          
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-header">
                  <div className="service-icon">
                    {service.icon}
                  </div>
                  <div className="service-titles">
                    <h3 className="service-title">{service.title}</h3>
                    <p className="service-title-en">{service.titleEn}</p>
                  </div>
                </div>
                
                <div className="service-image">
                  <img src={service.image} alt={service.title} className="service-img" />
                </div>
                
                <div className="service-descriptions">
                  <p className="service-description">{service.description}</p>
                  <p className="service-description-en">{service.descriptionEn}</p>
                </div>
                
                <div className="service-link">
                  <button className="learn-more-btn">
                    اعرف المزيد
                    <svg className="arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">من نحن</h2>
          </div>
          
          <div className="about-content">
            <p className="about-text">
              نحن مؤسسة متخصصة في تقديم الحلول التقنية المتطورة والخدمات المتميزة في مجال تقنية المعلومات والأمن السيبراني. 
              نتمتع بخبرة واسعة وفريق متخصص يضمن تقديم أفضل الخدمات لعملائنا.
            </p>
            <p className="about-text-secondary">
              نؤمن بأن مفتاح النجاح يكمن في التميز والجودة، والذي يضمن رضا عملائنا وتحقيق أهدافهم التقنية بكفاءة عالية.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon green">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="feature-title">معايير جودة عالية</h3>
              <p className="feature-description">
                نلتزم بأعلى معايير الجودة وأفضل الممارسات العالمية
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon blue">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="feature-title">فريق خبير</h3>
              <p className="feature-description">
                فريق تقني متخصص ذو كفاءة عالية وخبرة واسعة
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon purple">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="feature-title">تدابير أمنية شاملة</h3>
              <p className="feature-description">
                حلول أمنية متقدمة تضمن حماية البيانات والأنظمة
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon orange">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="feature-title">التحسين المستمر</h3>
              <p className="feature-description">
                منهجية عمل متقدمة تضمن التطوير والتحسين المستمر
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="security">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">الأمان والامتثال</h2>
            <p className="section-subtitle">
              نلتزم بأعلى معايير الأمان والحماية لضمان سلامة بياناتكم وأنظمتكم
            </p>
          </div>

          <div className="security-grid">
            <div className="security-card">
              <div className="security-icon blue">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="security-title">حماية البيانات</h3>
              <p className="security-description">
                تطبيق أحدث تقنيات الحماية والتشفير لضمان أمان البيانات
              </p>
            </div>

            <div className="security-card">
              <div className="security-icon green">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="security-title">الامتثال للمعايير</h3>
              <p className="security-description">
                الالتزام بالمعايير الدولية ومتطلبات الحماية السيبرانية
              </p>
            </div>

            <div className="security-card">
              <div className="security-icon purple">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="security-title">المراقبة المستمرة</h3>
              <p className="security-description">
                مراقبة الأنظمة على مدار الساعة للكشف المبكر عن التهديدات
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">تواصل معنا</h2>
            <p className="section-subtitle">
              نحن هنا لمساعدتكم في تحقيق أهدافكم التقنية
            </p>
          </div>

          <div className="contact-grid">
            <div className="contact-info">
              <h3 className="contact-info-title">معلومات التواصل</h3>
              
              <div className="contact-items">
                <div className="contact-item">
                  <div className="contact-icon blue">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="contact-details">
                    <h4 className="contact-label">العنوان</h4>
                    <p className="contact-value">صندوق بريد 229 - سكاكا - المملكة العربية السعودية</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon green">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="contact-details">
                    <h4 className="contact-label">الهاتف</h4>
                    <p className="contact-value">0590409111</p>
                    <p className="contact-value">0547247562</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon purple">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="contact-details">
                    <h4 className="contact-label">البريد الإلكتروني</h4>
                    <p className="contact-value">altatawar@altatawar.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form">
              <h3 className="form-title">أرسل لنا رسالة</h3>
              <p className="form-subtitle">سنتواصل معك في أقرب وقت ممكن</p>
              
              <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">الاسم</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">البريد الإلكتروني</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">الموضوع</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">الرسالة</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="form-textarea"
                    required
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="form-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'جاري الإرسال...' : 'إرسال الرسالة'}
                </button>

                {submitMessage && (
                  <div className={`form-message ${submitMessage.includes('نجاح') ? 'success' : 'error'}`}>
                    {submitMessage}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-section">
              <div className="footer-logo">
                <img src={logoImage} alt="التطور التكنولوجي" className="footer-logo-img" />
                <h3 className="footer-company-name">التطور التكنولوجي</h3>
              </div>
              <p className="footer-description">
                نتشرف بتقديم خدماتنا التقنية المتميزة بأعلى معايير الجودة وأفضل الممارسات العالمية.
              </p>
            </div>

            <div className="footer-section">
              <h4 className="footer-title">روابط سريعة</h4>
              <ul className="footer-links">
                <li><button className="footer-link" onClick={() => scrollToSection('home')}>الرئيسية</button></li>
                <li><button className="footer-link" onClick={() => scrollToSection('services')}>الخدمات</button></li>
                <li><button className="footer-link" onClick={() => scrollToSection('about')}>من نحن</button></li>
                <li><button className="footer-link" onClick={() => scrollToSection('security')}>الأمان</button></li>
                <li><button className="footer-link" onClick={() => scrollToSection('contact')}>اتصل بنا</button></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4 className="footer-title">معلومات التواصل</h4>
              <div className="footer-contact">
                <p>صندوق بريد 229 - سكاكا</p>
                <p>المملكة العربية السعودية</p>
                <p>0590409111 | 0547247562</p>
                <p>altatawar@altatawar.com</p>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-copyright">
              © {new Date().getFullYear()} التطور التكنولوجي. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

