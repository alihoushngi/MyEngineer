export type BackendProvince = {
  id: number;
  name: string;
  slug?: string | null;
  image?: string | null;
};

export type BackendCity = {
  id: number;
  name: string;
  slug?: string | null;
  province_id: number;
  image?: string | null;
};

export type BackendServiceNode = {
  id: number;
  title: string;
  short_title?: string | null;
  slug: string;
  description?: string | null;
  image?: string | null;
  parent_id?: number | null;
  children?: readonly BackendServiceNode[];
};

export type BackendSlider = {
  id: number;
  title: string;
  image?: string | null;
  alt?: string | null;
  service_id?: number | null;
};

export type BackendTestimonial = {
  id: number;
  name?: string | null;
  title?: string | null;
  description?: string | null;
  image?: string | null;
};

export type BackendBrand = {
  id: number;
  name: string;
  slug?: string | null;
  image?: string | null;
  link?: string | null;
};

export type BackendTeamMember = {
  id: number;
  name: string;
  position?: string | null;
  image?: string | null;
};

export type BackendBlogCategory = {
  id: number;
  name: string;
  slug: string;
  parent_id?: number | null;
};

export type BackendBlog = {
  id: number;
  title: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  views?: number | string | null;
  status?: string | null;
  category?: BackendBlogCategory | null;
  tags?: readonly { id: number; name: string; slug?: string }[] | null;
  created_at?: string | null;
};

export type BackendFaq = {
  id: number;
  question: string;
  slug?: string | null;
  answer: string;
  receiver?: string | null;
  service_id?: number | null;
  blog_id?: number | null;
};

export type BackendKnowledgeCategory = {
  id: number;
  name: string;
  slug: string;
  image?: string | null;
  description?: string | null;
};

export type BackendKnowledge = {
  id: number;
  title: string;
  description?: string | null;
  category?: BackendKnowledgeCategory | null;
};

export type BackendProfessionalCard = {
  id: number;
  name: string;
  family?: string | null;
  full_name?: string | null;
  image?: string | null;
  role?: string | null;
  city?: string | null;
  province?: string | null;
  working_years?: number | string | null;
  rating?: number | null;
  rating_count?: number | null;
};

export type BackendNamedEntity = {
  id: number;
  name?: string | null;
  title?: string | null;
  slug?: string | null;
};

export type BackendEducation = {
  id?: number;
  degree?: string | null;
  field?: string | BackendNamedEntity | null;
  university?: string | null;
  institution?: string | null;
  year?: number | string | null;
};

export type BackendCertificate = {
  id: number;
  title?: string | null;
  name?: string | null;
  issuer?: string | null;
};

export type BackendPortfolio = {
  id: number;
  title?: string | null;
  description?: string | null;
  image?: string | null;
};

export type BackendProfessionalComment = {
  id: number;
  body?: string | null;
  comment?: string | null;
  rating?: number | null;
  user?: { name?: string | null; full_name?: string | null } | null;
  created_at?: string | null;
};

export type BackendProfessionalDetail = Omit<
  BackendProfessionalCard,
  "city" | "province"
> & {
  mobile?: string | null;
  phone_contact?: string | number | null;
  bio?: string | null;
  province?: BackendProvince | string | null;
  city?: BackendCity | string | null;
  cities_covered?: readonly BackendCity[] | null;
  services?: readonly BackendServiceNode[] | null;
  qualifications?: readonly BackendNamedEntity[] | null;
  educations?: readonly BackendEducation[] | null;
  certificates?: readonly BackendCertificate[] | null;
};

export type BackendSoftware = {
  id: number;
  name: string;
  slug?: string | null;
  image?: string | null;
};

export type BackendField = {
  id: number;
  name: string;
};
