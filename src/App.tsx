import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AICursor from './components/AICursor';
import ScrollProgress from './components/ScrollProgress';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App min-h-screen bg-gray-900 text-white overflow-x-hidden">
      <AICursor />
      <ScrollProgress />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
            >
              Sayed Arbaz
            </motion.div>
            
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'skills', 'projects', 'contact'].map((section) => (
                <motion.button
                  key={section}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-colors duration-300 ${
                    activeSection === section 
                      ? 'text-cyan-400' 
                      : 'text-gray-300 hover:text-cyan-400'
                  }`}
                >
                  {section}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-7xl md:text-9xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Hello
              </span>
            </h1>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-gray-300">
              I'm <span className="text-cyan-400">Sayed Arbaz</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
              Full-Stack Developer & AI Enthusiast crafting innovative solutions for the Indian market
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('projects')}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
            >
              View My Work
            </motion.button>
          </motion.div>
        </div>
        
        {/* Floating elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-20 left-20 w-4 h-4 bg-cyan-400 rounded-full opacity-60"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute bottom-20 right-20 w-6 h-6 bg-purple-400 rounded-full opacity-60"
        />
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-800/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              About Me
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Passionate about building AI-powered solutions and Web3 tools for the Indian market
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl p-8 border border-gray-700">
                <h3 className="text-2xl font-semibold mb-4 text-cyan-400">My Journey</h3>
                <p className="text-gray-300 leading-relaxed">
                  I'm a full-stack developer with a passion for AI and Web3 technologies. 
                  I specialize in building Telegram bots, Flutter applications, and innovative 
                  solutions that solve real problems for Indian users.
                </p>
                <p className="text-gray-300 leading-relaxed mt-4">
                  From BharatGPT - an AI assistant for Indian students, to LinkHub - a radar-based 
                  social app, I love creating tools that make a difference. Currently working on 
                  building Web3 tools and token launchpads for the Indian crypto community.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { number: '4+', label: 'Projects Built' },
                { number: '1000+', label: 'Users Served' },
                { number: '3+', label: 'Technologies' },
                { number: '24/7', label: 'AI Assistant' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-800 rounded-lg p-6 text-center border border-gray-700"
                >
                  <div className="text-3xl font-bold text-cyan-400 mb-2">{stat.number}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Skills & Technologies
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Technologies I've mastered to build innovative solutions
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { name: 'Python', icon: '🐍', color: 'from-yellow-500 to-orange-500' },
              { name: 'JavaScript', icon: '⚡', color: 'from-yellow-400 to-yellow-600' },
              { name: 'Flutter', icon: '📱', color: 'from-blue-500 to-cyan-500' },
              { name: 'Firebase', icon: '🔥', color: 'from-orange-500 to-yellow-500' },
              { name: 'GitHub', icon: '🐙', color: 'from-gray-700 to-gray-900' },
              { name: 'Bot', icon: '🤖', color: 'from-blue-400 to-blue-600' },
              { name: 'HTML/CSS', icon: '🌐', color: 'from-orange-500 to-pink-500' },
              { name: 'Web3', icon: '⛓️', color: 'from-purple-500 to-pink-500' }
            ].map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-gray-800 rounded-lg p-6 text-center border border-gray-700 hover:border-cyan-400 transition-all duration-300"
              >
                <div className="text-4xl mb-3">{skill.icon}</div>
                <div className="text-lg font-semibold text-gray-200">{skill.name}</div>
                <div className={`w-full h-1 mt-3 rounded-full bg-gradient-to-r ${skill.color}`}></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-800/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Showcasing my best work and innovative solutions for the Indian market
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'BharatGPT',
                description: 'AI-powered assistant helping Indian students with resume building, exam support, and government scheme guidance',
                tech: ['Python', 'AI Models', 'API', 'Railway'],
                image: '🤖',
                color: 'from-green-500 to-emerald-500',
                status: 'Live & Deployed'
              },
              {
                title: 'LinkHub',
                description: 'Radar-based social app for discovering nearby people at events, weddings, and parties with minimalist black & white UI',
                tech: ['Flutter', 'Dart', 'Firebase', 'APK'],
                image: '📡',
                color: 'from-purple-500 to-pink-500',
                status: 'Ready for Deployment'
              },
              {
                title: 'MemeFun India',
                description: 'Token launchpad for Indian meme coins with alerts, VIP access, and wallet integration (In Development)',
                tech: ['Web3', 'Blockchain', 'Bot', 'Smart Contracts'],
                image: '🚀',
                color: 'from-cyan-500 to-blue-500',
                status: 'In Development'
              }
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-cyan-400 transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${project.color} flex items-center justify-center text-2xl mb-4`}>
                  {project.image}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-200">{project.title}</h3>
                <p className="text-gray-400 mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-cyan-400 font-semibold">{project.status}</span>
                </div>
                {project.title === 'BharatGPT' && (
                  <a
                    href="https://bharatxkr.netlify.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full mt-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-2 rounded-lg text-center font-semibold transition-all duration-300"
                  >
                    Visit BharatGPT Web
                  </a>
                )}
                {project.title === 'LinkHub' && (
                  <a
                    href="https://radarhub.netlify.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full mt-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-2 rounded-lg text-center font-semibold transition-all duration-300"
                  >
                    Visit RadarHub Web
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Ready to build something amazing together? Let's connect and create innovative solutions
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold mb-6 text-cyan-400">Let's Connect</h3>
              <div className="space-y-4">
                {[
                  { icon: '📧', label: 'Email', value: 'sayyadarbazz@gmail.com' },
                  { icon: '📱', label: 'Phone', value: '+91 8101692797' },
                  { icon: '💼', label: 'Instagram', value: '@arbaz_xkr'},
                  { icon: '🐙', label: 'GitHub', value: 'github.com/sayedarbaz' }
                ].map((contact, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 10 }}
                    className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg border border-gray-700"
                  >
                    <div className="text-2xl">{contact.icon}</div>
                    <div>
                      <div className="text-sm text-gray-400">{contact.label}</div>
                      <div className="text-gray-200">{contact.value}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <form className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors duration-300"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors duration-300"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Your Message"
                    rows={5}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors duration-300 resize-none"
                  ></textarea>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white py-3 rounded-lg font-semibold transition-all duration-300"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 Sayed Arbaz. Built with ❤️ and lots of ☕
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
