import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LightbulbIcon, BuildingIcon, ShieldCheckIcon, Mail, Linkedin } from 'lucide-react';
import { WaitlistModal } from './WaitlistModal';
const features = [{
  icon: LightbulbIcon,
  title: 'Submit Feature & Product Ideas',
  description: 'Skip the patent process. Submit your innovations and get paid fast with no lengthy wait times or patent fees.',
  details: 'Creators apply to join our platform and go through a vetting process to ensure quality and credibility. Once approved, submit your feature or product ideas and get them in front of companies immediately. No patent applications, no waiting periods, no legal fees. Just a streamlined path from idea to payment. All submissions are protected by automatic NDAs before any company can view them. Free to join, zero upfront costs.',
  gradient: 'from-amber-500 to-yellow-500',
  glowColor: 'rgba(245, 158, 11, 0.2)'
}, {
  icon: BuildingIcon,
  title: 'Company Review & Connection',
  description: 'Access curated, high-quality innovations from vetted creators. Browse, review, and connect, all free.',
  details: 'Companies get free access to a curated selection of feature and product ideas from trusted, high-caliber creators who have been vetted through our application process. Browse innovations that match your needs, review detailed submissions, and connect directly with creators when you find something compelling. No subscription fees, no browsing costs. Just free access to a pipeline of credible, innovative ideas.',
  gradient: 'from-yellow-500 to-amber-400',
  glowColor: 'rgba(255, 215, 0, 0.2)'
}, {
  icon: ShieldCheckIcon,
  title: 'Negotiate, Sign & Implement',
  description: 'Direct negotiations, electronic contracts, immediate implementation. Fast, transparent, and efficient.',
  details: 'When a company expresses interest, our platform enables direct connection for transparent price negotiations. Once terms are agreed upon, contracts are signed electronically through our secure system. After execution, companies can implement the idea immediately. The entire process is designed for speed and efficiency with no middlemen, no delays, just a clean path from interest to implementation with creators getting fast compensation.',
  gradient: 'from-amber-400 to-yellow-400',
  glowColor: 'rgba(218, 165, 32, 0.2)'
}];
export function Features() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'CREATOR' | 'COMPANY'>('CREATOR');

  return <div id="how-it-works" className="pb-0 px-4 sm:px-6 relative bg-[#0a0a0f] -mt-[100px] sm:-mt-[150px] md:-mt-[200px] pt-[400px] sm:pt-[500px] md:pt-[600px]">

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.8
      }} className="text-center mb-32">
          <motion.h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 tracking-tight" animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
        }} transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'linear'
        }} style={{
          backgroundSize: '200% 100%'
        }}>
            How it{' '}
            <span className="bg-gradient-to-r from-amber-200 via-yellow-200 to-amber-300 bg-clip-text text-transparent">
              works
            </span>
          </motion.h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto font-normal px-4">
            A free platform connecting creators and companies. Creators skip the patent process and get paid fast. Companies get free access to curated, high-quality innovations from vetted creators. Streamlined, efficient, zero fees to join.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
          {features.map((feature, index) => <motion.div key={feature.title} initial={{
          opacity: 0,
          y: 50
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6,
          delay: index * 0.15
        }} className="group relative">
              {/* Subtle glow */}
              <motion.div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
            background: `linear-gradient(135deg, ${feature.glowColor}, transparent)`,
            filter: 'blur(30px)'
          }} />

              <motion.div whileHover={{
            y: -8
          }} transition={{
            duration: 0.3
          }} className="relative h-full p-6 sm:p-8 md:p-12 rounded-2xl bg-gradient-to-b from-white/5 to-white/0 border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all duration-300 overflow-hidden flex flex-col">
                {/* Subtle gradient overlay */}
                <motion.div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                <div className="relative">
                  {/* Icon */}
                  <motion.div whileHover={{
                rotate: 5,
                scale: 1.05
              }} transition={{
                duration: 0.4
              }} className={`inline-flex p-3 sm:p-4 rounded-xl bg-gradient-to-br ${feature.gradient} mb-6 sm:mb-10`} style={{
                boxShadow: `0 8px 30px ${feature.glowColor}`
              }}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white tracking-tight">
                    {feature.title}
                  </h3>

                  <p className="text-gray-400 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4 font-normal">
                    {feature.description}
                  </p>

                  <div className="mt-4 sm:mt-6 pt-4 sm:pt-6">
                    <motion.div 
                      className="border-t border-amber-500 mb-4 sm:mb-6"
                      initial={{ opacity: 0, scaleX: 0 }}
                      whileInView={{ opacity: 1, scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.1 + 0.3, ease: 'easeOut' }}
                      style={{ transformOrigin: 'left' }}
                    />
                    <p className="text-gray-500 leading-relaxed text-xs sm:text-sm font-normal">
                      {feature.details}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>)}
        </div>

        {/* Process Overview */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-32"
        >
          <div className="group relative w-full">
            {/* Subtle glow */}
            <motion.div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
              background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), transparent)',
              filter: 'blur(30px)',
              zIndex: 0
            }} />

            <motion.div 
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="relative p-6 sm:p-8 md:p-12 rounded-2xl bg-gradient-to-b from-white/5 to-white/0 border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all duration-300 overflow-hidden"
            >
              {/* Subtle gradient overlay */}
              <motion.div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-yellow-500 opacity-0 group-hover:opacity-5 transition-opacity duration-500" />

            <div className="relative">
              <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center text-white tracking-tight">How the Process Works</h3>
              <div className="space-y-4 sm:space-y-6 text-left">
              <div className="flex gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center text-white font-bold text-xs sm:text-sm">1</div>
                <div>
                  <h4 className="font-semibold mb-2 text-sm sm:text-base">Creator Application & Idea Submission</h4>
                  <p className="text-gray-400 text-xs sm:text-sm">Creators apply to join the platform and go through a vetting process to ensure quality and credibility. Once approved, submit your feature or product ideas and get them in front of companies immediately. Skip the patent process with no applications, no waiting periods, and no legal fees. Just submit and connect. Free to join.</p>
                </div>
              </div>
              <div className="flex gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center text-white font-bold text-xs sm:text-sm">2</div>
                <div>
                  <h4 className="font-semibold mb-2 text-sm sm:text-base">Company Review</h4>
                  <p className="text-gray-400 text-xs sm:text-sm">Companies get free access to browse curated, high-quality innovations from vetted creators. Review submissions that match your innovation needs. All ideas are protected by NDAs before companies can view details. No subscription fees, no costs to browse. Just free access to a pipeline of credible ideas.</p>
                </div>
              </div>
              <div className="flex gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center text-white font-bold text-xs sm:text-sm">3</div>
                <div>
                  <h4 className="font-semibold mb-2 text-sm sm:text-base">Connect & Negotiate</h4>
                  <p className="text-gray-400 text-xs sm:text-sm">When a company is interested in an idea, our platform enables direct connection with the creator. Negotiate prices directly with no middlemen and no delays. Creators get fast compensation without the lengthy patent process. Both parties agree on terms transparently before moving forward.</p>
                </div>
              </div>
              <div className="flex gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center text-white font-bold text-xs sm:text-sm">4</div>
                <div>
                  <h4 className="font-semibold mb-2 text-sm sm:text-base">Sign Contracts & Implement</h4>
                  <p className="text-gray-400 text-xs sm:text-sm">Once terms are agreed upon, contracts are signed electronically through our secure platform. After execution, companies can implement the idea immediately. Creators receive fast compensation, and companies get innovative features or products ready to implement. Clean, efficient, fast.</p>
                </div>
              </div>
            </div>
            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                <div className="p-4 sm:p-6 rounded-xl bg-white/5 border border-white/10">
                  <h4 className="font-semibold mb-3 text-amber-300 text-sm sm:text-base">For Creators</h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
                    <li>• Fast payment by skipping the patent process</li>
                    <li>• No waiting periods or legal fees</li>
                    <li>• Solve problems and monetize creativity</li>
                    <li>• Free to join with zero upfront costs</li>
                    <li>• Direct connection with companies</li>
                  </ul>
                </div>
                <div className="p-4 sm:p-6 rounded-xl bg-white/5 border border-white/10">
                  <h4 className="font-semibold mb-3 text-amber-300 text-sm sm:text-base">For Companies</h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
                    <li>• Free access to curated innovations</li>
                    <li>• Ideas from trusted, vetted creators</li>
                    <li>• High-caliber, credible sources</li>
                    <li>• Free to join with no subscription fees</li>
                    <li>• Direct connection with creators</li>
                  </ul>
                </div>
              </div>
            </div>
            </div>
          </motion.div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.8
      }} className="mt-60 sm:mt-96 md:mt-[500px] pb-12 sm:pb-16 text-center" id="contact-us">
          <div className="px-4">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 tracking-tight">
              Contact Us
            </h3>
            <p className="text-gray-400 mb-6 sm:mb-10 max-w-xl mx-auto text-sm sm:text-base font-normal">
              Have questions? We'd love to hear from you. Reach out and let's start a conversation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <motion.a
                href="mailto:trypostulate@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: 1.05
                }}
                className="flex items-center gap-2 text-gradient-animated font-normal text-sm sm:text-base"
              >
                <Mail className="w-5 h-5" style={{ 
                  stroke: '#FFD700'
                }} />
                <span>trypostulate@gmail.com</span>
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/company/postulate-ai/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: 1.05
                }}
                className="flex items-center gap-2 text-gradient-animated font-normal text-sm sm:text-base"
              >
                <Linkedin className="w-5 h-5" style={{ 
                  stroke: '#FFD700'
                }} />
                <span>postulate.ai</span>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>

      <WaitlistModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        type={modalType}
      />
    </div>;
}