enum OrgType {
  BRAND = 'BRAND',
  METAVERSE = 'METAVERSE',
  COMMUNITY = 'COMMUNITY',
}

enum RequestStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  DENIED = 'DENIED',
  COMPLETED = 'COMPLETED',
}

export interface OnboardingRequest { // TABLE
  questionnaire_answers: JSON, // required
  organization_name: string, // required
  organization_type: OrgType, // required
  email: string, // required
  status: RequestStatus, // required
  admin_message: string, // message sent to the org as reason for approval or denial,
  organization_id: string; // will be filled when organization is approved and created.
}

// Since this set of info is repeated across the different org types
// We can separate and link with foreign key
interface OrganizationBio { // TABLE
  id: number; // foreign key on the other tables
  name: string; // required
  admin_first_name: string; // required
  admin_last_name: string; // required
  admin_email: string // required
  wallet_address: string;
}

export interface Brand { // TABLE
  id: string; // A unique identifier generated from the brand nane
  bio: OrganizationBio; // Linked with 'bio_id' foreign key
}

export interface Metaverse { // TABLE
  id: string; // A unique identifier generated from the metaverse nane
  bio: OrganizationBio; // Linked with 'bio_id' foreign key

}

export interface Community { // TABLE
  id: string; // A unique identifier generated from the community nane
  bio: OrganizationBio; // Linked with 'bio_id' foreign key
  website: string; // required
  twitter: string; // required
  discord: string; // required
  nft_type: OrgNftDimension; // required
  nft_connected: boolean; // required
  metaverse: string[];  // required e.g 'Sandbox', 'Decentraland', 'Galagames', 'Other'
}

enum OrgNftDimension {
  TWO_D = '2D',
  THREE_D = '3D',
  BOTH = '2D_AND_3D',
}
export {};
