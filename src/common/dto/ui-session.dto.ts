export class UISessionDTO {
    sessionId?: string;
    isLoggedIn!: boolean;
    isAuthorized?: boolean;
    currentPublicationId?: number;
    currentSectionId?: number;
    currentSubsectionId?: number;
    currentPageId?: number;
}