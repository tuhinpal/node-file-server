#!/data/data/com.termux/files/usr/bin/sh

termux-wake-lock

# create a tmux screen
tmux new-session -d -s nodefileserver
# start a command in the tmux screen
tmux send-keys -t nodefileserver 'cd $HOME/node-file-server && npm start' C-m