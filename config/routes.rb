LiveChat::Application.routes.draw do
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'
  root :to => 'pages#index'
  
  get 'logIn' => 'pages#logIn'
  get 'signUp' => 'pages#signUp'
  get 'userSettings' => 'pages#userSettings'

  get 'schedule' => 'pages#schedule'
  get 'schedulePrint' => 'pages#schedulePrint'
  get 'scheduleBuilder' => 'pages#scheduleBuilder'
end
