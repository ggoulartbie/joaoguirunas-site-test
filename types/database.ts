export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      certificates: {
        Row: {
          cohort_id: string
          course_id: string
          id: string
          issued_at: string
          membership_id: string | null
          pdf_storage_path: string | null
          user_id: string
          verification_code: string
        }
        Insert: {
          cohort_id: string
          course_id: string
          id?: string
          issued_at?: string
          membership_id?: string | null
          pdf_storage_path?: string | null
          user_id: string
          verification_code: string
        }
        Update: {
          cohort_id?: string
          course_id?: string
          id?: string
          issued_at?: string
          membership_id?: string | null
          pdf_storage_path?: string | null
          user_id?: string
          verification_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "certificates_cohort_id_fkey"
            columns: ["cohort_id"]
            isOneToOne: false
            referencedRelation: "cohorts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "certificates_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "certificates_membership_id_fkey"
            columns: ["membership_id"]
            isOneToOne: false
            referencedRelation: "cohort_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "certificates_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      cohort_courses: {
        Row: {
          cohort_id: string
          course_id: string
          included_module_ids: string[]
          sort_order: number
        }
        Insert: {
          cohort_id: string
          course_id: string
          included_module_ids?: string[]
          sort_order?: number
        }
        Update: {
          cohort_id?: string
          course_id?: string
          included_module_ids?: string[]
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "cohort_courses_cohort_id_fkey"
            columns: ["cohort_id"]
            isOneToOne: false
            referencedRelation: "cohorts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cohort_courses_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      cohort_cross_extensions: {
        Row: {
          created_at: string
          days_granted: number
          description: string | null
          id: string
          is_active: boolean
          source_cohort_id: string
          target_cohort_id: string
        }
        Insert: {
          created_at?: string
          days_granted: number
          description?: string | null
          id?: string
          is_active?: boolean
          source_cohort_id: string
          target_cohort_id: string
        }
        Update: {
          created_at?: string
          days_granted?: number
          description?: string | null
          id?: string
          is_active?: boolean
          source_cohort_id?: string
          target_cohort_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cohort_cross_extensions_source_cohort_id_fkey"
            columns: ["source_cohort_id"]
            isOneToOne: false
            referencedRelation: "cohorts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cohort_cross_extensions_target_cohort_id_fkey"
            columns: ["target_cohort_id"]
            isOneToOne: false
            referencedRelation: "cohorts"
            referencedColumns: ["id"]
          },
        ]
      }
      cohort_members: {
        Row: {
          auto_renew_enabled: boolean
          cohort_id: string
          expires_at: string | null
          id: string
          joined_at: string
          member_role: string
          next_renewal_at: string | null
          status: string
          user_id: string
        }
        Insert: {
          auto_renew_enabled?: boolean
          cohort_id: string
          expires_at?: string | null
          id?: string
          joined_at?: string
          member_role?: string
          next_renewal_at?: string | null
          status?: string
          user_id: string
        }
        Update: {
          auto_renew_enabled?: boolean
          cohort_id?: string
          expires_at?: string | null
          id?: string
          joined_at?: string
          member_role?: string
          next_renewal_at?: string | null
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cohort_members_cohort_id_fkey"
            columns: ["cohort_id"]
            isOneToOne: false
            referencedRelation: "cohorts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cohort_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      cohorts: {
        Row: {
          access_duration_days: number | null
          allows_auto_renewal: boolean
          cover_image_url: string | null
          created_at: string
          description: string | null
          end_date: string | null
          entry_price_cents: number | null
          extension_duration_days: number | null
          extension_price_cents: number | null
          filled_seats: number
          group_url: string | null
          has_live_sessions: boolean
          has_public_page: boolean
          has_support: boolean
          id: string
          is_purchasable: boolean
          max_installments_entry: number
          max_installments_extension: number
          name: string
          slug: string
          start_date: string | null
          status: string
          stripe_price_entry_id: string | null
          stripe_price_extension_id: string | null
          total_seats: number | null
          updated_at: string
        }
        Insert: {
          access_duration_days?: number | null
          allows_auto_renewal?: boolean
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          entry_price_cents?: number | null
          extension_duration_days?: number | null
          extension_price_cents?: number | null
          filled_seats?: number
          group_url?: string | null
          has_live_sessions?: boolean
          has_public_page?: boolean
          has_support?: boolean
          id?: string
          is_purchasable?: boolean
          max_installments_entry?: number
          max_installments_extension?: number
          name: string
          slug: string
          start_date?: string | null
          status?: string
          stripe_price_entry_id?: string | null
          stripe_price_extension_id?: string | null
          total_seats?: number | null
          updated_at?: string
        }
        Update: {
          access_duration_days?: number | null
          allows_auto_renewal?: boolean
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          entry_price_cents?: number | null
          extension_duration_days?: number | null
          extension_price_cents?: number | null
          filled_seats?: number
          group_url?: string | null
          has_live_sessions?: boolean
          has_public_page?: boolean
          has_support?: boolean
          id?: string
          is_purchasable?: boolean
          max_installments_entry?: number
          max_installments_extension?: number
          name?: string
          slug?: string
          start_date?: string | null
          status?: string
          stripe_price_entry_id?: string | null
          stripe_price_extension_id?: string | null
          total_seats?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      comments: {
        Row: {
          author_id: string
          content: string
          created_at: string
          deleted_at: string | null
          id: string
          is_pinned: boolean
          lesson_id: string
          parent_comment_id: string | null
          updated_at: string
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string
          deleted_at?: string | null
          id?: string
          is_pinned?: boolean
          lesson_id: string
          parent_comment_id?: string | null
          updated_at?: string
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string
          deleted_at?: string | null
          id?: string
          is_pinned?: boolean
          lesson_id?: string
          parent_comment_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_parent_comment_id_fkey"
            columns: ["parent_comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
        ]
      }
      coupons: {
        Row: {
          applies_to: string
          code: string
          cohort_id: string
          created_at: string
          current_uses: number
          discount_kind: string
          discount_value: number
          id: string
          is_active: boolean
          max_uses: number | null
          stripe_coupon_id: string | null
          valid_from: string | null
          valid_until: string | null
        }
        Insert: {
          applies_to: string
          code: string
          cohort_id: string
          created_at?: string
          current_uses?: number
          discount_kind: string
          discount_value: number
          id?: string
          is_active?: boolean
          max_uses?: number | null
          stripe_coupon_id?: string | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Update: {
          applies_to?: string
          code?: string
          cohort_id?: string
          created_at?: string
          current_uses?: number
          discount_kind?: string
          discount_value?: number
          id?: string
          is_active?: boolean
          max_uses?: number | null
          stripe_coupon_id?: string | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "coupons_cohort_id_fkey"
            columns: ["cohort_id"]
            isOneToOne: false
            referencedRelation: "cohorts"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          cover_image_url: string | null
          created_at: string
          deleted_at: string | null
          description: string | null
          id: string
          published: boolean
          slug: string
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          cover_image_url?: string | null
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id?: string
          published?: boolean
          slug: string
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          cover_image_url?: string | null
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id?: string
          published?: boolean
          slug?: string
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      forum_categories: {
        Row: {
          color: string | null
          description: string | null
          id: string
          is_active: boolean
          name: string
          slug: string
          sort_order: number
        }
        Insert: {
          color?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          slug: string
          sort_order?: number
        }
        Update: {
          color?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          slug?: string
          sort_order?: number
        }
        Relationships: []
      }
      forum_replies: {
        Row: {
          author_id: string
          content: string
          created_at: string
          deleted_at: string | null
          id: string
          is_accepted_answer: boolean
          parent_reply_id: string | null
          thread_id: string
          updated_at: string
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string
          deleted_at?: string | null
          id?: string
          is_accepted_answer?: boolean
          parent_reply_id?: string | null
          thread_id: string
          updated_at?: string
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string
          deleted_at?: string | null
          id?: string
          is_accepted_answer?: boolean
          parent_reply_id?: string | null
          thread_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "forum_replies_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_replies_parent_reply_id_fkey"
            columns: ["parent_reply_id"]
            isOneToOne: false
            referencedRelation: "forum_replies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_replies_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "forum_threads"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_threads: {
        Row: {
          author_id: string
          category_id: string
          content: string
          created_at: string
          deleted_at: string | null
          id: string
          is_pinned: boolean
          is_resolved: boolean
          last_activity_at: string
          slug: string
          title: string
          view_count: number
        }
        Insert: {
          author_id: string
          category_id: string
          content: string
          created_at?: string
          deleted_at?: string | null
          id?: string
          is_pinned?: boolean
          is_resolved?: boolean
          last_activity_at?: string
          slug: string
          title: string
          view_count?: number
        }
        Update: {
          author_id?: string
          category_id?: string
          content?: string
          created_at?: string
          deleted_at?: string | null
          id?: string
          is_pinned?: boolean
          is_resolved?: boolean
          last_activity_at?: string
          slug?: string
          title?: string
          view_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "forum_threads_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_threads_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "forum_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      lesson_progress: {
        Row: {
          completed: boolean
          completed_at: string | null
          id: string
          lesson_id: string
          seconds_watched: number
          updated_at: string
          user_id: string
        }
        Insert: {
          completed?: boolean
          completed_at?: string | null
          id?: string
          lesson_id: string
          seconds_watched?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          completed?: boolean
          completed_at?: string | null
          id?: string
          lesson_id?: string
          seconds_watched?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lesson_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lesson_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          content: string | null
          content_format: string | null
          created_at: string
          deleted_at: string | null
          description: string | null
          duration_seconds: number | null
          id: string
          kind: string
          module_id: string
          slug: string
          sort_order: number
          title: string
          updated_at: string
          video_id: string | null
          video_provider: string | null
        }
        Insert: {
          content?: string | null
          content_format?: string | null
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          duration_seconds?: number | null
          id?: string
          kind: string
          module_id: string
          slug: string
          sort_order: number
          title: string
          updated_at?: string
          video_id?: string | null
          video_provider?: string | null
        }
        Update: {
          content?: string | null
          content_format?: string | null
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          duration_seconds?: number | null
          id?: string
          kind?: string
          module_id?: string
          slug?: string
          sort_order?: number
          title?: string
          updated_at?: string
          video_id?: string | null
          video_provider?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lessons_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
      live_sessions: {
        Row: {
          cohort_id: string
          created_at: string
          description: string | null
          duration_minutes: number
          id: string
          lesson_id: string | null
          meeting_url: string | null
          recording_url: string | null
          scheduled_at: string
          title: string
        }
        Insert: {
          cohort_id: string
          created_at?: string
          description?: string | null
          duration_minutes?: number
          id?: string
          lesson_id?: string | null
          meeting_url?: string | null
          recording_url?: string | null
          scheduled_at: string
          title: string
        }
        Update: {
          cohort_id?: string
          created_at?: string
          description?: string | null
          duration_minutes?: number
          id?: string
          lesson_id?: string | null
          meeting_url?: string | null
          recording_url?: string | null
          scheduled_at?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "live_sessions_cohort_id_fkey"
            columns: ["cohort_id"]
            isOneToOne: false
            referencedRelation: "cohorts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "live_sessions_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      materials: {
        Row: {
          created_at: string
          external_url: string | null
          id: string
          kind: string
          lesson_id: string
          size_bytes: number | null
          sort_order: number
          storage_path: string | null
          title: string
        }
        Insert: {
          created_at?: string
          external_url?: string | null
          id?: string
          kind: string
          lesson_id: string
          size_bytes?: number | null
          sort_order?: number
          storage_path?: string | null
          title: string
        }
        Update: {
          created_at?: string
          external_url?: string | null
          id?: string
          kind?: string
          lesson_id?: string
          size_bytes?: number | null
          sort_order?: number
          storage_path?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "materials_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      modules: {
        Row: {
          course_id: string
          cover_image_url: string | null
          created_at: string
          deleted_at: string | null
          description: string | null
          id: string
          slug: string
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          course_id: string
          cover_image_url?: string | null
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id?: string
          slug: string
          sort_order: number
          title: string
          updated_at?: string
        }
        Update: {
          course_id?: string
          cover_image_url?: string | null
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id?: string
          slug?: string
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "modules_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          action_url: string | null
          created_at: string
          id: string
          message: string | null
          notification_type: string
          read_at: string | null
          title: string
          user_id: string
        }
        Insert: {
          action_url?: string | null
          created_at?: string
          id?: string
          message?: string | null
          notification_type: string
          read_at?: string | null
          title: string
          user_id: string
        }
        Update: {
          action_url?: string | null
          created_at?: string
          id?: string
          message?: string | null
          notification_type?: string
          read_at?: string | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      onboarding: {
        Row: {
          cidade: string | null
          created_at: string
          ctx_1: string | null
          ctx_2: string | null
          ctx_3: string | null
          ctx_4: string | null
          empresa: string | null
          id: string
          linkedin: string | null
          nome: string
          obj_1: string | null
          obj_2: string | null
          obj_3: string | null
          obj_4: string | null
          pdf_path: string | null
          planejamento: string | null
          profissao: string | null
          proj_nome: string | null
          proj_problema: string | null
          proj_publico: string | null
          proj_resultado: string | null
          proj_tools: string | null
          segmento: string | null
          status: string
          updated_at: string
        }
        Insert: {
          cidade?: string | null
          created_at?: string
          ctx_1?: string | null
          ctx_2?: string | null
          ctx_3?: string | null
          ctx_4?: string | null
          empresa?: string | null
          id?: string
          linkedin?: string | null
          nome?: string
          obj_1?: string | null
          obj_2?: string | null
          obj_3?: string | null
          obj_4?: string | null
          pdf_path?: string | null
          planejamento?: string | null
          profissao?: string | null
          proj_nome?: string | null
          proj_problema?: string | null
          proj_publico?: string | null
          proj_resultado?: string | null
          proj_tools?: string | null
          segmento?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          cidade?: string | null
          created_at?: string
          ctx_1?: string | null
          ctx_2?: string | null
          ctx_3?: string | null
          ctx_4?: string | null
          empresa?: string | null
          id?: string
          linkedin?: string | null
          nome?: string
          obj_1?: string | null
          obj_2?: string | null
          obj_3?: string | null
          obj_4?: string | null
          pdf_path?: string | null
          planejamento?: string | null
          profissao?: string | null
          proj_nome?: string | null
          proj_problema?: string | null
          proj_publico?: string | null
          proj_resultado?: string | null
          proj_tools?: string | null
          segmento?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount_cents: number
          cohort_id: string
          coupon_id: string | null
          created_at: string
          id: string
          membership_id: string | null
          paid_at: string | null
          payment_method: string | null
          purchase_kind: string
          status: string
          stripe_checkout_session_id: string | null
          stripe_payment_intent_id: string | null
          stripe_subscription_id: string | null
          user_id: string
        }
        Insert: {
          amount_cents: number
          cohort_id: string
          coupon_id?: string | null
          created_at?: string
          id?: string
          membership_id?: string | null
          paid_at?: string | null
          payment_method?: string | null
          purchase_kind: string
          status?: string
          stripe_checkout_session_id?: string | null
          stripe_payment_intent_id?: string | null
          stripe_subscription_id?: string | null
          user_id: string
        }
        Update: {
          amount_cents?: number
          cohort_id?: string
          coupon_id?: string | null
          created_at?: string
          id?: string
          membership_id?: string | null
          paid_at?: string | null
          payment_method?: string | null
          purchase_kind?: string
          status?: string
          stripe_checkout_session_id?: string | null
          stripe_payment_intent_id?: string | null
          stripe_subscription_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_cohort_id_fkey"
            columns: ["cohort_id"]
            isOneToOne: false
            referencedRelation: "cohorts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_coupon_id_fkey"
            columns: ["coupon_id"]
            isOneToOne: false
            referencedRelation: "coupons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_membership_id_fkey"
            columns: ["membership_id"]
            isOneToOne: false
            referencedRelation: "cohort_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          id: string
          name: string
          role: string
          stripe_customer_id: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          id: string
          name: string
          role?: string
          stripe_customer_id?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          id?: string
          name?: string
          role?: string
          stripe_customer_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      votes: {
        Row: {
          created_at: string
          id: string
          reply_id: string | null
          thread_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          reply_id?: string | null
          thread_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          reply_id?: string | null
          thread_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "votes_reply_id_fkey"
            columns: ["reply_id"]
            isOneToOne: false
            referencedRelation: "forum_replies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "votes_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "forum_threads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "votes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      webhook_events: {
        Row: {
          error_message: string | null
          event_type: string
          id: string
          payload: Json | null
          processed_at: string
          stripe_event_id: string
          success: boolean
        }
        Insert: {
          error_message?: string | null
          event_type: string
          id?: string
          payload?: Json | null
          processed_at?: string
          stripe_event_id: string
          success?: boolean
        }
        Update: {
          error_message?: string | null
          event_type?: string
          id?: string
          payload?: Json | null
          processed_at?: string
          stripe_event_id?: string
          success?: boolean
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_access: {
        Args: { p_lesson_id: string; p_user_id: string }
        Returns: boolean
      }
      increment_filled_seats: {
        Args: { p_cohort_id: string }
        Returns: undefined
      }
      is_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
