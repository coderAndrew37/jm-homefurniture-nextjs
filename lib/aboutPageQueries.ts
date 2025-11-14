export const TEAM_QUERY = `*[_type == "teamMember"]{
  _id,
  name,
  role,
  bio,
  "image": image.asset->url
}`;

export const VALUES_QUERY = `
  *[_type == "companyValue"] | order(title asc) {
    _id,
    title,
    description,
    icon
  }
`;

export const MILESTONES_QUERY = `
  *[_type == "companyMilestone"] | order(year asc) {
    _id,
    year,
    event
  }
`;
