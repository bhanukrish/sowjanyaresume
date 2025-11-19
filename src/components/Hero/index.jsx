import {
  FaArrowRight,
  FaEnvelope,
  FaPhone,
  FaLocationDot,
  FaUserLarge,
  FaChartSimple,
  FaBriefcase,
  FaBuildingColumns,
  FaFlask,
  FaNewspaper,
  FaPaperPlane,
  FaGraduationCap,
  FaScrewdriverWrench,
} from "react-icons/fa6";
import { useState } from "react";
import { motion } from "framer-motion";
import { saveAs } from "file-saver";
import { generateResumeTemplate } from "../../utils/resumeTemplate";
import "./hero.css";
import profilePhoto from "../../assets/profile_photo.jpg"

const NAV_ITEMS = [
  { id: "about", label: "About", icon: FaUserLarge },
  { id: "experience", label: "Experience", icon: FaChartSimple },
  { id: "education", label: "Education", icon: FaBuildingColumns },
  { id: "projects", label: "Projects", icon: FaScrewdriverWrench },
  { id: "competencies", label: "Competencies", icon: FaBriefcase },
  { id: "academia", label: "Academia", icon: FaGraduationCap },
  { id: "labs", label: "Labs", icon: FaFlask },
  { id: "events", label: "Events", icon: FaNewspaper },
  { id: "contact", label: "Contact", icon: FaPaperPlane },
];

const FALLBACK_IMAGE = "https://framerusercontent.com/images/GyiKJtfezTsVnzAmsESmbaCyNw.png";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, duration: 0.4 },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function HeroSection({ data }) {
  if (!data) {
    return null;
  }

  const [activeNav, setActiveNav] = useState(NAV_ITEMS[0].id);
  const personal = data.personal_details ?? {};
  const guidance = data.guidance_provided ?? {};
  const experiences = data.professional_experience ?? [];
  const academics = data.academic_profile ?? [];
  const certifications = data.certifications ?? [];
  const software = data.computer_knowledge ?? [];
  const subjects = data.subjects_taught ?? [];
  const laboratories = data.laboratories_associated ?? [];
  const workshops = data.conferences_workshops ?? [];

  const contactList = [
    data.email && {
      id: "email",
      label: "Email",
      value: data.email,
      icon: FaEnvelope,
      href: `mailto:${data.email}`,
    },
    data.phone && {
      id: "phone",
      label: "Phone",
      value: data.phone,
      icon: FaPhone,
      href: `tel:${data.phone}`,
    },
    personal.permanent_address && {
      id: "location",
      label: "Location",
      value: personal.permanent_address,
      icon: FaLocationDot,
    },
  ].filter(Boolean);

  const stats = [
    guidance.btech_projects && {
      label: "B.Tech Projects Guided",
      value: `${guidance.btech_projects}+`,
    },
    guidance.mtech_projects && {
      label: "M.Tech Projects Guided",
      value: `${guidance.mtech_projects}+`,
    },
    workshops.length > 0 && {
      label: "Workshops & FDPs",
      value: `${workshops.length}`,
    },
  ].filter(Boolean);

  const projectShowcase = [
    data.projects?.under_graduation && {
      title: "Under Graduation",
      description: data.projects.under_graduation,
    },
    data.projects?.post_graduation && {
      title: "Post Graduation",
      description: data.projects.post_graduation,
    },
  ].filter(Boolean);

  const industrialExperience = data.industrial_experience;

  const personalDetails = [
    personal.date_of_birth && {
      label: "Date of Birth",
      value: personal.date_of_birth,
    },
    personal.father_name && {
      label: "Father's Name",
      value: personal.father_name,
    },
    personal.marital_status && {
      label: "Marital Status",
      value: personal.marital_status,
    },
    personal.nationality && {
      label: "Nationality",
      value: personal.nationality,
    },
  ].filter(Boolean);

  const handleDownloadResume = () => {
    const resumeContent = generateResumeTemplate(data);
    const slug = (data.name || "resume").toLowerCase().replace(/\s+/g, "-");
    const blob = new Blob([resumeContent], {
      type: "text/plain;charset=utf-8",
    });
    saveAs(blob, `${slug}-resume.txt`);
  };

  return (
    <motion.section
      className="hero-wrapper"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.nav
        className="hero-menu glass-menu"
        aria-label="Resume sections"
        variants={childVariants}
      >
        {NAV_ITEMS.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`menu-link menu-dot ${
              activeNav === item.id ? "active" : ""
            }`}
            onClick={() => setActiveNav(item.id)}
            aria-label={item.label}
          >
            <item.icon aria-hidden="true" />
            <span className="menu-label">{item.label}</span>
          </a>
        ))}
      </motion.nav>

      <motion.aside className="profile-card" variants={childVariants}>
        <div className="profile-image">
          <img
            src={data.profile_image || profilePhoto}
            alt={`${data.name} profile`}
          />
        </div>

        <div className="profile-details">
          <p className="profile-role">{data.profession_name}</p>
          <h2 className="profile-name">{data.name}</h2>
        </div>

        <div className="profile-contact">
          {contactList.map((item) => (
            <div key={item.id} className="contact-row">
              <item.icon aria-hidden="true" />
              {item.href ? (
                <a href={item.href}>{item.value}</a>
              ) : (
                <p>{item.value}</p>
              )}
            </div>
          ))}
        </div>

        <div className="profile-meta">
          {personal.languages_known?.length ? (
            <div>
              <p className="meta-label">Languages</p>
              <p className="meta-value">
                {personal.languages_known.join(" / ")}
              </p>
            </div>
          ) : null}
          {personal.interests_hobbies?.length ? (
            <div>
              <p className="meta-label">Interests</p>
              <p className="meta-value">
                {personal.interests_hobbies.slice(0, 3).join(" / ")}
              </p>
            </div>
          ) : null}
        </div>

        <div className="profile-actions">
          <button
            type="button"
            className="btn btn-outline"
            onClick={handleDownloadResume}
          >
            <FaArrowRight />
            Download
          </button>
          <a className="btn" href="#experience">
            <FaArrowRight />
            Journey
          </a>
          <a
            className="btn btn-green"
            href={`mailto:${data.email}?subject=Pipeline%20Engineering%20Collaboration`}
          >
            <FaEnvelope />
            Contact
          </a>
        </div>
      </motion.aside>

      <motion.main className="hero-content" variants={childVariants}>
        <motion.header className="hero-header" id="about" variants={sectionVariants}>
          <p className="eyebrow">{data.profession_name}</p>
          <h1 className="hero-title">
            Driving resilient pipeline infrastructure for energy leaders in
            India.
          </h1>
          <p className="hero-description">{data.professional_summary}</p>
          <div className="hero-contact-grid">
            {contactList.map((item) => (
              <motion.article
                key={`header-${item.id}`}
                className="contact-pill"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <item.icon aria-hidden="true" />
                <div>
                  <p>{item.label}</p>
                  <strong>{item.value}</strong>
                </div>
              </motion.article>
            ))}
          </div>
          <div className="hero-stats">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="stat-value">{stat.value}</p>
                <p className="stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.header>

        <motion.section
          id="experience"
          className="hero-section"
          variants={sectionVariants}
        >
          <article className="section-card">
            <div className="section-heading">
              <p className="section-eyebrow">Career Journey</p>
              <h3>Professional Experience</h3>
            </div>
            <div className="timeline">
              {experiences.map((role, index) => (
                <article
                  key={`${role.organization}-${index}`}
                  className="timeline-item"
                >
                  <div>
                    <p className="timeline-title">{role.designation}</p>
                    <p className="timeline-subtitle">{role.organization}</p>
                  </div>
                  <span className="timeline-duration">{role.duration}</span>
                </article>
              ))}
            </div>
          </article>
        </motion.section>

        <motion.section
          id="education"
          className="hero-section"
          variants={sectionVariants}
        >
          <article className="section-card">
            <div className="section-heading">
              <p className="section-eyebrow">Academic Roots</p>
              <h3>Education</h3>
            </div>
            <div className="timeline">
              {academics.map((academic) => (
                <article
                  key={`${academic.qualification}-${academic.duration}`}
                  className="timeline-item"
                >
                  <div>
                    <p className="timeline-title">{academic.qualification}</p>
                    <p className="timeline-subtitle">
                      {academic.institution}
                    </p>
                    <p className="timeline-subtitle">
                      {academic.board_university} • {academic.percentage}
                    </p>
                  </div>
                  <span className="timeline-duration">{academic.duration}</span>
                </article>
              ))}
            </div>
          </article>
        </motion.section>

        <motion.section
          id="projects"
          className="hero-section"
          variants={sectionVariants}
        >
          <div className="section-grid">
            <article className="section-card">
              <div className="section-heading">
                <p className="section-eyebrow">Research Focus</p>
                <h3>Highlighted Projects</h3>
              </div>
              <div className="project-grid">
                {projectShowcase.map((project) => (
                  <div key={project.title} className="project-card">
                    <p className="project-label">{project.title}</p>
                    <p className="project-description">{project.description}</p>
                  </div>
                ))}
              </div>
            </article>

            {industrialExperience ? (
              <article className="section-card">
                <div className="section-heading">
                  <p className="section-eyebrow">Industry Immersion</p>
                  <h3>{industrialExperience.project_title}</h3>
                </div>
                <p className="section-description">
                  {industrialExperience.company}
                </p>
                <p className="text-muted">{industrialExperience.duration}</p>
              </article>
            ) : null}
          </div>
        </motion.section>

        <motion.section
          id="competencies"
          className="hero-section"
          variants={sectionVariants}
        >
          <div className="section-grid">
            <article className="section-card">
              <div className="section-heading">
                <p className="section-eyebrow">Credentials</p>
                <h3>Certifications</h3>
              </div>
              <ul className="chip-list">
                {certifications.map((item) => (
                  <li key={item} className="chip">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
            <article className="section-card">
              <div className="section-heading">
                <p className="section-eyebrow">Toolbox</p>
                <h3>Software & Platforms</h3>
              </div>
              <ul className="chip-list">
                {software.map((tool) => (
                  <li key={tool} className="chip">
                    {tool}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </motion.section>

        <motion.section
          id="academia"
          className="hero-section"
          variants={sectionVariants}
        >
          <article className="section-card">
            <div className="section-heading">
              <p className="section-eyebrow">Classroom</p>
              <h3>Subjects Taught</h3>
            </div>
            <ul className="bullet-grid">
              {subjects.map((subject) => (
                <li key={subject}>{subject}</li>
              ))}
            </ul>
          </article>
        </motion.section>

        <motion.section
          id="labs"
          className="hero-section"
          variants={sectionVariants}
        >
          <article className="section-card">
            <div className="section-heading">
              <p className="section-eyebrow">Laboratories</p>
              <h3>Hands-on Infrastructure</h3>
            </div>
            <ul className="bullet-grid">
              {laboratories.map((lab) => (
                <li key={lab}>{lab}</li>
              ))}
            </ul>
          </article>
        </motion.section>

        <motion.section
          id="events"
          className="hero-section"
          variants={sectionVariants}
        >
          <article className="section-card">
            <div className="section-heading">
              <p className="section-eyebrow">Knowledge Sharing</p>
              <h3>Conferences & Workshops</h3>
            </div>
            <ul className="bullet-list">
              {workshops.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </motion.section>

        <motion.section
          id="contact"
          className="hero-section"
          variants={sectionVariants}
        >
          <article className="section-card contact-card">
            <div className="section-heading">
              <p className="section-eyebrow">Let's Collaborate</p>
              <h3>Personal Details</h3>
            </div>
            <div className="detail-grid">
              {personalDetails.map((detail) => (
                <div key={detail.label} className="detail-item">
                  <p className="detail-label">{detail.label}</p>
                  <p className="detail-value">{detail.value}</p>
                </div>
              ))}
            </div>
            <div className="hero-contact-grid">
              {contactList.map((item) => (
                <motion.article
                  key={`contact-${item.id}`}
                  className="contact-pill"
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <item.icon aria-hidden="true" />
                  <div>
                    <p>{item.label}</p>
                    <strong>{item.value}</strong>
                  </div>
                </motion.article>
              ))}
            </div>
            <div className="contact-actions">
              <a
                className="btn btn-green"
                href={`mailto:${data.email}?subject=Connect%20with%20Sowjanya`}
              >
                <FaEnvelope />
                Email me
              </a>
              <a className="btn" href="#about">
                <FaArrowRight />
                View Profile
              </a>
            </div>
          </article>
        </motion.section>
      </motion.main>
    </motion.section>
  );
}
