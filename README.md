# README

This project is a practice run for 'bookies' my final project at Full Sail.
This is a scheduling application for the student workers at the Full Sail Library.
-letsTalk@alyssa.io


# Welcome to bookies on Rails

Rails is a web-application framework that includes everything needed to create
database-backed web applications according to the Model-View-Control pattern.



## Getting Started

If you already have Xcode, Rails, Homebrew, Git, and the latest version of Ruby, then you’re good to go. Move on to **Setting Up The Project**.

1. First things first, if you don't have it, go download Xcode from the Mac App Store, then install it.

2. After Xcode is done installing, open it, then open its preferences panel by pressing command + comma. Click the `Downloads` tab, and click the `Install` button next to `Command Line Tools`.

3. Next, we need to install Rails. In terminal, enter the following.

		gem update --system
		gem install rails

4. Next, we’re going to install homebrew. In terminal, enter the following, and follow homebrew’s instructions.

		ruby -e "$(curl -fsSL https://raw.github.com/mxcl/homebrew/go)"
		
5. After you’re done installing homebrew, let’s run `brew doctor` in terminal:
		
	If you get this message:
	
		Error: No such file or directory - /usr/local/Cellar
		
	Then run the following command, otherwise, move on to step 6.

		sudo mkdir /usr/local/Cellar
		sudo chown -R `whoami` /usr/local

	The second line is needed to give you permissions to write to the new Cellar directory. Run `brew doctor` again. If you see the message, `Your system is raring to brew`, move on to step 6. If you happen to get a warning about your Xcode being configured with an invalid path, type this into Terminal, then move on to step 6.
	
		sudo xcode-select -switch /Applications/Xcode.app/Contents/Developer

6. Alright, now, if you don’t have it, let’s install git. In terminal...

		brew install git
		
	After it’s done, go ahead and run `brew doctor` again. If you get this message:
	
		Warning: /usr/bin occurs before /usr/local/bin
		
	Then run this:
	
		echo 'export PATH="/usr/local/bin:/usr/local/sbin:~/bin:$PATH"' >> ~/.bash_profile
		
	Quit Terminal and relaunch it again, then run `brew doctor` once more. You should know see the message that says your system is raring to brew.
	
7. Configure git with your name and email address. In Terminal...

		git config --global user.name "Your Full Name"
		git config --global user.email "Your Email Address"

8. Install RVM with Ruby 2.0.0.

		\curl -L https://get.rvm.io | bash -s head --autolibs=3 --ruby
		rvm get head --autolibs=3
		rvm install ruby-2.0.0
		rvm --default use ruby-2.0.0
		source ~/.rvm/scripts/rvm
		rvm get head --auto-dotfiles
		
9. And lastly, let’s install postgres.

		brew install postgres
		
## Setting Up The Project

1. Clone this repository and bundle up the gems.
		
		git clone git@github.com:alyssamichelle/MDD.git
		cd MDD/
		bundle

3. Modify /config/database.yml, replacing my username with yours.
4. Then...

		rake db:create
		rails server
		
5. Go to `http://localhost:3000` in your browser.
