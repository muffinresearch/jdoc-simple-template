# Updating

## How to do the update from the master JSDoc tree

Note: If you've forked from muffinresearch/jsdoc-default-template you shouldn't need this. Just keep updated with that repo.

    # Update from the jsdoc master
    git checkout upstream-master
    git pull
    # Split out the new commits for the template
    git subtree split --prefix=templates/default --onto upstream-default-template -b upstream-default-template
    # Pull changes into this project
    git checkout master
    git rebase upstream-default

Notes taken from: http://stackoverflow.com/questions/24577084/forking-a-sub-directory-of-a-repository-on-github-and-making-it-part-of-my-own-r
