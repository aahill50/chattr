Chattr::Application.routes.draw do
  root to: 'posts#index'
  resources :users, except: [:destroy] do
    resources :posts, only: [:new]
  end
  resources :posts
  resource :user_follows, only: [:create, :destroy]
  resource :session, only: [:new, :create, :destroy]
  resource :favorites, only: [:create, :destroy]

  namespace :api, defaults: {format: :json} do
    get 'users/current_user', to: 'users#current'
    resources :users
    resources :posts
  end

  post 'users/search', to: 'users#search', as: 'user_search'
  post 'posts/new', to: 'posts#reply'

  get 'users/:id/following', to: 'users#profile_following', as: 'user_profile_following'
  get 'users/:id/followers', to: 'users#profile_followers', as: 'user_profile_followers'
  get 'users/:id/favorite_posts', to: 'users#profile_favorite_posts', as: 'user_profile_favorite_posts'

end
