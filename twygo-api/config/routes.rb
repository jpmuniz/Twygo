Rails.application.routes.draw do
  # Health check
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    resources :courses, only: [:index, :show, :create, :update, :destroy]

    resources :course_videos, only: [] do
      member do
        post :upload         # POST /api/course_videos/:id/upload
        get  :show_videos    # GET  /api/course_videos/:id/show_videos
      end
      collection do
        get :courses_with_videos
        get :all_videos 
        get :video_sizes     # GET  /api/course_videos/video_sizes
      end
    end
  end
  get "videos/:id", to: "videos#show", as: :video
  # Sempre no final
  match "*unmatched", to: "application#route_not_found", via: :all
end
