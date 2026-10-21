export type SourceStatus = 'verified' | 'pending';
export type ClaimKind = 'theory' | 'evidence' | 'application' | 'simulation';
export type Citation = { sourceId?: string; url: string; locator?: string };
export type Provenance = { source: string; sourceStatus: SourceStatus; kind: ClaimKind; citations?: Citation[] };
export type Claim = Provenance & { text: string };
export const claim = (text: string, source: string, kind: ClaimKind = 'theory', sourceStatus: SourceStatus = 'pending'): Claim => ({ text, source, kind, sourceStatus });
