export const useJobs = () => {
  const jobs = ref([
    {
      id: 1,
      title: 'Product Designer',
      company: 'Google',
      companyLogo: 'https://logo.clearbit.com/google.com',
      location: 'Seattle, WA,USA',
      type: 'full-time',
      urgent: true,
      requirements: [
        "Bachelor's degree in Design or equivalent practical experience",
        "A portfolio that refined digital product design across multiple projects"
      ]
    },
    {
      id: 2,
      title: 'UX Designer',
      company: 'Meta,Facebook',
      companyLogo: 'https://logo.clearbit.com/meta.com',
      location: 'New York, NY,USA',
      type: 'full-time',
      urgent: false,
      requirements: [
        "Bachelor's degree in Design or equivalent practical experience",
        "1+ years of experience in product design or UX"
      ]
    },
    {
      id: 3,
      title: 'Interaction Designer',
      company: 'Amazon',
      companyLogo: 'https://logo.clearbit.com/amazon.com',
      location: 'Seattle, WA,USA',
      type: 'part-time',
      urgent: false,
      requirements: [
        "Bachelor's degree in Design or equivalent practical experience",
        "Experience with user-centered design principles",
        "Strong portfolio demonstrating interaction design skills"
      ]
    },
    {
      id: 4,
      title: 'Senior UI/UX Designer',
      company: 'Apple',
      companyLogo: 'https://logo.clearbit.com/apple.com',
      location: 'Cupertino, CA,USA',
      type: 'full-time',
      urgent: true,
      requirements: [
        "5+ years of experience in UI/UX design",
        "Expert knowledge of design tools (Figma, Sketch, Adobe XD)",
        "Experience leading design projects from concept to launch"
      ]
    },
    {
      id: 5,
      title: 'Visual Designer',
      company: 'Netflix',
      companyLogo: 'https://logo.clearbit.com/netflix.com',
      location: 'Los Angeles, CA,USA',
      type: 'full-time',
      urgent: false,
      requirements: [
        "Strong visual design skills with attention to detail",
        "Experience in branding and visual identity",
        "Proficiency in Adobe Creative Suite"
      ]
    },
    {
      id: 6,
      title: 'Mobile App Designer',
      company: 'Spotify',
      companyLogo: 'https://logo.clearbit.com/spotify.com',
      location: 'Stockholm, Sweden',
      type: 'full-time',
      urgent: false,
      requirements: [
        "Experience designing mobile applications for iOS and Android",
        "Understanding of mobile design patterns and guidelines",
        "Strong collaboration skills with developers and product managers"
      ]
    }
  ])

  const filteredJobs = computed(() => {
    return jobs.value
  })

  return {
    jobs,
    filteredJobs
  }
}
