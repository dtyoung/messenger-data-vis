#! /bin/sh

MESSAGES_DIR=messages
DIRECTORIES_TO_REMOVE=(stickers_used message_requests archived_threads filtered_threads)

cd $MESSAGES_DIR

echo "Removing unecessary top level directories"
for dir in ${DIRECTORIES_TO_REMOVE[@]}
do
  if [ -d "$dir" ]; then rm -r $dir; fi
done
echo "Completed"

echo "Removing all directories to leave message files"
find ./inbox -type d -mindepth 2 -depth -exec rm -r {} +
echo "Completed"
