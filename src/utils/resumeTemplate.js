function formatList(items = []) {
  return items.map((item) => `  - ${item}`).join("\n");
}

function formatTimeline(rows = [], formatter) {
  return rows
    .map((item) => `  - ${formatter(item)}`)
    .join("\n")
    .trim();
}

export function generateResumeTemplate(data) {
  if (!data) {
    return "Resume data unavailable.";
  }

  const {
    name,
    profession_name,
    professional_summary,
    email,
    phone,
    professional_experience = [],
    academic_profile = [],
    certifications = [],
    computer_knowledge = [],
    subjects_taught = [],
    laboratories_associated = [],
    conferences_workshops = [],
    projects,
    industrial_experience,
    personal_details = {},
  } = data;

  const sections = [
    `${name ?? ""}`.toUpperCase(),
    profession_name ?? "",
    "",
    "SUMMARY",
    professional_summary ?? "",
    "",
    "CONTACT",
    `  - Email: ${email ?? "N/A"}`,
    `  - Phone: ${phone ?? "N/A"}`,
    personal_details.permanent_address
      ? `  - Location: ${personal_details.permanent_address}`
      : null,
    "",
    "PROFESSIONAL EXPERIENCE",
    formatTimeline(professional_experience, (role) =>
      [
        role.designation,
        role.organization,
        role.duration ? `(${role.duration})` : null,
      ]
        .filter(Boolean)
        .join(" | ")
    ) || "  - Details not provided.",
    "",
    "EDUCATION",
    formatTimeline(academic_profile, (academic) =>
      [
        academic.qualification,
        academic.institution,
        academic.board_university,
        academic.percentage,
        academic.duration ? `(${academic.duration})` : null,
      ]
        .filter(Boolean)
        .join(" | ")
    ) || "  - Details not provided.",
    "",
    "PROJECTS",
    projects?.under_graduation
      ? `  - Under Graduation: ${projects.under_graduation}`
      : null,
    projects?.post_graduation
      ? `  - Post Graduation: ${projects.post_graduation}`
      : null,
    industrial_experience
      ? `  - Industry: ${industrial_experience.company} | ${industrial_experience.project_title} (${industrial_experience.duration})`
      : null,
    "",
    "CERTIFICATIONS",
    formatList(certifications) || "  - Not provided.",
    "",
    "TECHNICAL SKILLS",
    formatList(computer_knowledge) || "  - Not provided.",
    "",
    "SUBJECTS TAUGHT",
    formatList(subjects_taught) || "  - Not provided.",
    "",
    "LABORATORIES",
    formatList(laboratories_associated) || "  - Not provided.",
    "",
    "CONFERENCES & WORKSHOPS",
    formatList(conferences_workshops) || "  - Not provided.",
  ].filter(Boolean);

  return sections.join("\n");
}
