export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          role: 'customer' | 'shopkeeper' | 'admin'
          name: string
          phone: string | null
          created_at: string
        }
        Insert: {
          id: string
          role?: 'customer' | 'shopkeeper' | 'admin'
          name: string
          phone?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          role?: 'customer' | 'shopkeeper' | 'admin'
          name?: string
          phone?: string | null
          created_at?: string
        }
      }
      shops: {
        Row: {
          id: string
          owner_id: string
          shop_name: string
          owner_name: string | null
          phone: string | null
          address: string
          latitude: number | null
          longitude: number | null
          opening_time: string | null
          closing_time: string | null
          category: string | null
          rating: number
          created_at: string
        }
        Insert: {
          id?: string
          owner_id: string
          shop_name: string
          owner_name?: string | null
          phone?: string | null
          address: string
          latitude?: number | null
          longitude?: number | null
          opening_time?: string | null
          closing_time?: string | null
          category?: string | null
          rating?: number
          created_at?: string
        }
        Update: {
          id?: string
          owner_id?: string
          shop_name?: string
          owner_name?: string | null
          phone?: string | null
          address?: string
          latitude?: number | null
          longitude?: number | null
          opening_time?: string | null
          closing_time?: string | null
          category?: string | null
          rating?: number
          created_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
      }
      products: {
        Row: {
          id: string
          category_id: string
          name: string
          aliases: string[] | null
        }
        Insert: {
          id?: string
          category_id: string
          name: string
          aliases?: string[] | null
        }
        Update: {
          id?: string
          category_id?: string
          name?: string
          aliases?: string[] | null
        }
      }
      inventory: {
        Row: {
          id: string
          shop_id: string
          product_id: string
          price: number
          quantity: number
          unit: string
          freshness_score: number
          confidence_score: number
          image_url: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          shop_id: string
          product_id: string
          price: number
          quantity: number
          unit?: string
          freshness_score?: number
          confidence_score?: number
          image_url?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          shop_id?: string
          product_id?: string
          price?: number
          quantity?: number
          unit?: string
          freshness_score?: number
          confidence_score?: number
          image_url?: string | null
          updated_at?: string
        }
      }
      feedback: {
        Row: {
          id: string
          shop_id: string
          product_id: string | null
          available: boolean
          created_at: string
        }
        Insert: {
          id?: string
          shop_id: string
          product_id?: string | null
          available: boolean
          created_at?: string
        }
        Update: {
          id?: string
          shop_id?: string
          product_id?: string | null
          available?: boolean
          created_at?: string
        }
      }
      search_logs: {
        Row: {
          id: string
          query: string
          user_id: string | null
          timestamp: string
        }
        Insert: {
          id?: string
          query: string
          user_id?: string | null
          timestamp?: string
        }
        Update: {
          id?: string
          query?: string
          user_id?: string | null
          timestamp?: string
        }
      }
    }
  }
}
