import { Container } from 'inversify';
import { userContainer } from './core/containers/user.container';
import { tokenContainer } from './core/containers/token.container';
import { threadContainer } from './core/containers/thread.container';
import { sectionContainer } from './core/containers/section.container';
import { postContainer } from './core/containers/post.container';
import { likeContainer } from './core/containers/like.container';
import { commentContainer } from './core/containers/comment.container';
import { databaseContainer } from './db/containers/database.container';
import { helperContainer } from './api/containers/helper.container';

export let appContainer = Container.merge(userContainer, tokenContainer);
appContainer = Container.merge(appContainer, threadContainer);
appContainer = Container.merge(appContainer, sectionContainer);
appContainer = Container.merge(appContainer, postContainer);
appContainer = Container.merge(appContainer, likeContainer);
appContainer = Container.merge(appContainer, commentContainer);
appContainer = Container.merge(appContainer, databaseContainer);
appContainer = Container.merge(appContainer, helperContainer);
