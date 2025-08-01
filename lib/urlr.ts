/**
 * Service d'intégration URLR pour le raccourcissement de liens d'articles
 * Documentation: https://docs.urlr.me/api-reference/v1/
 */

interface URLRAccessToken {
  token: string
  refresh_token: string
}

interface URLRCreateLinkRequest {
  url: string
  team_id: string
  folder_id?: string
  domain?: string
  code?: string
  label?: string
  tags?: string[]
  password?: string
  qrcode?: {
    size?: number
    format?: 'png' | 'webp' | 'svg'
    margin?: number
    background_color?: string
    foreground_color?: string
  }
  utm?: {
    campaign?: string
    medium?: string
    source?: string
    content?: string
  }
  metatag?: {
    title?: string
    description?: string
    image?: string
  }
  geolinks?: Array<{
    conditions: Array<{
      type: string
      value: string
      operator: string
    }>
    url: string
  }>
  delete_at?: string
  expired_at?: string
  expired_url?: string
  delete_after_expiration?: boolean
}

interface URLRCreateLinkResponse {
  id: string
  url: string
  team_id: string
  folder_id?: string
  domain: string
  code: string
  label?: string
  tags?: Array<{
    id: string
    name: string
  }>
  qrcode?: {
    data: string
  }
  utm?: {
    campaign?: string
    medium?: string
    source?: string
    content?: string
  }
  metatag?: {
    title?: string
    description?: string
    image?: string
  }
  geolinks?: Array<{
    conditions: Array<{
      type: string
      value: string
      operator: string
    }>
    url: string
  }>
  created_at: string
  updated_at: string
  delete_at?: string
  expired_at?: string
  expired_url?: string
  delete_after_expiration: boolean
}

interface URLRStatisticsRequest {
  link_id: string
  from: string
  to: string
}

interface URLRStatisticsResponse {
  link_id: string
  clicks: number
  unique_clicks: number
}

class URLRService {
  private baseUrl = 'https://urlr.me/api/v1'
  private accessToken: string | null = null
  private refreshToken: string | null = null
  private teamId: string | null = null

  constructor() {
    this.accessToken = process.env.URLR_ACCESS_TOKEN || null
    this.refreshToken = process.env.URLR_REFRESH_TOKEN || null
    this.teamId = process.env.URLR_TEAM_ID || null
  }

  private getTeamId(): string {
    return this.teamId || process.env.URLR_TEAM_ID || ''
  }

  /**
   * Authentification avec URLR
   */
  async authenticate(): Promise<URLRAccessToken> {
    const username = process.env.URLR_USERNAME
    const password = process.env.URLR_PASSWORD

    if (!username || !password) {
      throw new Error('URLR_USERNAME et URLR_PASSWORD requis pour l\'authentification')
    }

    const response = await fetch(`${this.baseUrl}/access_tokens/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })

    if (!response.ok) {
      throw new Error(`Erreur d'authentification URLR: ${response.status}`)
    }

    const data: URLRAccessToken = await response.json()
    this.accessToken = data.token
    this.refreshToken = data.refresh_token

    return data
  }

  /**
   * Rafraîchir le token d'accès
   */
  async refreshAccessToken(): Promise<URLRAccessToken> {
    if (!this.refreshToken) {
      throw new Error('Refresh token non disponible')
    }

    const response = await fetch(`${this.baseUrl}/access_tokens/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refresh_token: this.refreshToken,
      }),
    })

    if (!response.ok) {
      throw new Error(`Erreur de rafraîchissement du token: ${response.status}`)
    }

    const data: URLRAccessToken = await response.json()
    this.accessToken = data.token
    this.refreshToken = data.refresh_token

    return data
  }

  /**
   * Créer un lien raccourci pour un article du blog
   */
  async createArticleLink(
    articleUrl: string,
    articleTitle: string,
    articleDescription?: string,
    articleImage?: string
  ): Promise<URLRCreateLinkResponse> {
    if (!this.accessToken) {
      await this.authenticate()
    }

    const teamId = this.getTeamId()
    if (!teamId) {
      throw new Error('URLR_TEAM_ID requis pour créer un lien')
    }

    // Générer un code personnalisé avec le préfixe e2ivoip
    const customCode = `e2ivoip-${Date.now()}`

    const requestBody: URLRCreateLinkRequest = {
      url: articleUrl,
      team_id: teamId,
      code: customCode,
      label: `Article: ${articleTitle}`,
      metatag: {
        title: articleTitle,
        description: articleDescription,
        image: articleImage,
      },
      utm: {
        source: 'e2ivoip-blog',
        medium: 'article',
        campaign: 'blog-marketing',
      },
    }

    const response = await fetch(`${this.baseUrl}/links/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`,
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      if (response.status === 401) {
        // Token expiré, essayer de le rafraîchir
        await this.refreshAccessToken()
        return this.createArticleLink(articleUrl, articleTitle, articleDescription, articleImage)
      }
      throw new Error(`Erreur création lien URLR: ${response.status}`)
    }

    return response.json()
  }

  /**
   * Créer un QR code pour un lien
   */
  async createQRCode(linkId: string, size: number = 600): Promise<{ data: string }> {
    if (!this.accessToken) {
      await this.authenticate()
    }

    const response = await fetch(`${this.baseUrl}/qrcodes/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`,
      },
      body: JSON.stringify({
        link_id: linkId,
        size,
        format: 'png',
        margin: 0,
        background_color: '#ffffff',
        foreground_color: '#000000',
      }),
    })

    if (!response.ok) {
      throw new Error(`Erreur création QR code: ${response.status}`)
    }

    return response.json()
  }

  /**
   * Obtenir les statistiques d'un lien
   */
  async getLinkStatistics(
    linkId: string,
    from: string,
    to: string
  ): Promise<URLRStatisticsResponse> {
    if (!this.accessToken) {
      await this.authenticate()
    }

    const response = await fetch(`${this.baseUrl}/statistics`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`,
      },
      body: JSON.stringify({
        link_id: linkId,
        from,
        to,
      }),
    })

    if (!response.ok) {
      throw new Error(`Erreur récupération statistiques: ${response.status}`)
    }

    return response.json()
  }

  /**
   * Obtenir les informations d'un lien
   */
  async getLink(linkId: string): Promise<URLRCreateLinkResponse> {
    if (!this.accessToken) {
      await this.authenticate()
    }

    const response = await fetch(`${this.baseUrl}/links/${linkId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Erreur récupération lien: ${response.status}`)
    }

    return response.json()
  }

  /**
   * Modifier un lien existant
   */
  async updateLink(linkId: string, updates: Partial<URLRCreateLinkRequest>): Promise<URLRCreateLinkResponse> {
    if (!this.accessToken) {
      await this.authenticate()
    }

    const response = await fetch(`${this.baseUrl}/links/${linkId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`,
      },
      body: JSON.stringify(updates),
    })

    if (!response.ok) {
      throw new Error(`Erreur modification lien: ${response.status}`)
    }

    return response.json()
  }
}

// Instance singleton
export const urlrService = new URLRService()

/**
 * Utilitaire pour raccourcir automatiquement les liens d'articles HubSpot
 */
export async function shortenArticleLink(
  articleUrl: string,
  articleTitle: string,
  articleDescription?: string,
  articleImage?: string
): Promise<{ shortUrl: string; qrCode?: string }> {
  try {
    // Créer le lien raccourci
    const link = await urlrService.createArticleLink(articleUrl, articleTitle, articleDescription, articleImage)
    
    // Créer un QR code optionnel
    let qrCode: string | undefined
    try {
      const qrCodeData = await urlrService.createQRCode(link.id)
      qrCode = qrCodeData.data
    } catch (error) {
      console.warn('Impossible de créer le QR code:', error)
    }

    return {
      shortUrl: `https://urlr.me/${link.code}`,
      qrCode,
    }
  } catch (error) {
    console.error('Erreur lors du raccourcissement du lien:', error)
    throw error
  }
} 