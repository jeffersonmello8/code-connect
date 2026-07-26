import * as bcrypt from 'bcrypt';
import dataSource from '../../data-source';
import { Comment } from '../posts/entities/comment.entity';
import { Like } from '../posts/entities/like.entity';
import { Post } from '../posts/entities/post.entity';
import { User } from '../users/entities/user.entity';

const SEED_USERS = [
  {
    name: 'Julio Santos',
    email: 'julio@codeconnect.dev',
    password: 'senha123',
  },
  {
    name: 'Marcia Oliveira',
    email: 'marcia@codeconnect.dev',
    password: 'senha123',
  },
  {
    name: 'Gabriel Luz',
    email: 'gabriel@codeconnect.dev',
    password: 'senha123',
  },
];

const SAMPLE_CODE = `const pluckDeep = key => obj => key.split('.').reduce((accum, key) => accum[key], obj)

const compose = (...fns) => res => fns.reduce((accum, next) => next(accum), res)

const unfold = (f, seed) => {
  const go = (f, seed, acc) => {
    const res = f(seed)
    return res ? go(f, res[1], acc.concat([res[0]])) : acc
  }
  return go(f, seed, [])
}`;

async function seed() {
  await dataSource.initialize();

  const userRepo = dataSource.getRepository(User);
  const postRepo = dataSource.getRepository(Post);
  const likeRepo = dataSource.getRepository(Like);
  const commentRepo = dataSource.getRepository(Comment);

  const existingPosts = await postRepo.count();
  if (existingPosts > 0) {
    console.log('Seed ignorado: posts já existem no banco.');
    await dataSource.destroy();
    return;
  }

  const users: User[] = [];

  for (const seedUser of SEED_USERS) {
    let user = await userRepo.findOne({
      where: { email: seedUser.email },
    });

    if (!user) {
      const passwordHash = await bcrypt.hash(seedUser.password, 10);
      user = userRepo.create({
        name: seedUser.name,
        email: seedUser.email,
        passwordHash,
      });
      user = await userRepo.save(user);
    }

    users.push(user);
  }

  const [julio, marcia, gabriel] = users;

  const postsData = [
    {
      title: 'Dashboard React com Tailwind',
      description:
        'Interface dark mode para monitoramento de métricas com componentes reutilizáveis e gráficos responsivos.',
      code: SAMPLE_CODE,
      thumbnailUrl: 'https://picsum.photos/seed/codeconnect1/800/480',
      tags: ['React', 'Front-end', 'Tailwind'],
      authorId: julio.id,
    },
    {
      title: 'Hooks customizados para formulários',
      description:
        'Padrões para validação, estados de loading e integração com APIs REST em formulários complexos.',
      code: SAMPLE_CODE,
      thumbnailUrl: null,
      tags: ['React', 'Hooks'],
      authorId: julio.id,
    },
    {
      title: 'Acessibilidade em SPAs',
      description:
        'Checklist prático de WCAG AA para aplicações React: foco, contraste, landmarks e testes automatizados.',
      code: null,
      thumbnailUrl: 'https://picsum.photos/seed/codeconnect2/800/480',
      tags: ['Acessibilidade', 'Front-end'],
      authorId: marcia.id,
    },
    {
      title: 'NestJS + TypeORM na prática',
      description:
        'Estrutura modular, DTOs com class-validator e migrations para APIs REST escaláveis.',
      code: SAMPLE_CODE,
      thumbnailUrl: 'https://picsum.photos/seed/codeconnect3/800/480',
      tags: ['NestJS', 'TypeORM', 'Back-end'],
      authorId: gabriel.id,
    },
    {
      title: 'Design system com Atomic Design',
      description:
        'Organização de componentes em atoms, molecules e organisms para times de produto.',
      code: null,
      thumbnailUrl: null,
      tags: ['Design', 'Front-end'],
      authorId: marcia.id,
    },
    {
      title: 'Testes E2E com Supertest',
      description:
        'Cobertura de fluxos críticos de autenticação e CRUD com Jest e Supertest no NestJS.',
      code: SAMPLE_CODE,
      thumbnailUrl: 'https://picsum.photos/seed/codeconnect4/800/480',
      tags: ['Testes', 'Back-end'],
      authorId: gabriel.id,
    },
    {
      title: 'Otimização de imagens no Vite',
      description:
        'Estratégias de lazy loading, formatos modernos e placeholders para melhorar LCP.',
      code: null,
      thumbnailUrl: 'https://invalid-url.example/broken-image.png',
      tags: ['Vite', 'Performance'],
      authorId: julio.id,
    },
    {
      title: 'Comentários aninhados em React',
      description:
        'Modelagem de threads de comentários com respostas de um nível e toggles de visibilidade.',
      code: SAMPLE_CODE,
      thumbnailUrl: 'https://picsum.photos/seed/codeconnect5/800/480',
      tags: ['React', 'UX'],
      authorId: julio.id,
    },
  ];

  const posts = await postRepo.save(
    postsData.map((data) => postRepo.create(data)),
  );

  const mainPost = posts[0];

  await likeRepo.save([
    likeRepo.create({ postId: mainPost.id, userId: marcia.id }),
    likeRepo.create({ postId: mainPost.id, userId: gabriel.id }),
    likeRepo.create({ postId: posts[1].id, userId: julio.id }),
    likeRepo.create({ postId: posts[3].id, userId: julio.id }),
    likeRepo.create({ postId: posts[3].id, userId: marcia.id }),
  ]);

  const comment1 = await commentRepo.save(
    commentRepo.create({
      postId: mainPost.id,
      authorId: marcia.id,
      body: 'Achei muito bom seu código @julio, parabéns!',
      parentId: null,
    }),
  );

  const comment2 = await commentRepo.save(
    commentRepo.create({
      postId: mainPost.id,
      authorId: gabriel.id,
      body: 'Quanto tempo você levou para finalizar esse projeto?',
      parentId: null,
    }),
  );

  await commentRepo.save(
    commentRepo.create({
      postId: mainPost.id,
      authorId: julio.id,
      body: 'Até que foi rápido, uns 3 dias!',
      parentId: comment2.id,
    }),
  );

  await commentRepo.save(
    commentRepo.create({
      postId: mainPost.id,
      authorId: marcia.id,
      body: 'Espero chegar um dia nesse nível! Muito bom!',
      parentId: null,
    }),
  );

  await commentRepo.save(
    commentRepo.create({
      postId: mainPost.id,
      authorId: julio.id,
      body: 'Poxa, obrigado Marcia, se precisar de ajuda é só entrar em contato!',
      parentId: comment1.id,
    }),
  );

  console.log(
    `Seed concluído: ${users.length} usuários, ${posts.length} posts.`,
  );
  await dataSource.destroy();
}

seed().catch((error: unknown) => {
  console.error('Erro ao executar seed:', error);
  process.exit(1);
});
