LiveChat::Application.routes.draw do
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'
  root :to => 'pages#index'
  get 'schedule' => 'pages#schedule'
  get 'signUp' => 'pages#signUp'
  get 'scheduleBuilder' => 'pages#scheduleBuilder'
end
