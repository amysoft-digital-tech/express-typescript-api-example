export class AppSessionDTO {
    sessionId?: string;
    userId!: number;
    isLoggedIn!: boolean;
    isAuthorized?: boolean;
    currentPublicationId?: number;
    currentSectionId?: number;
    currentSubsectionId?: number;
    currentPageId?: number;    
}