import {MigrationInterface, QueryRunner} from "typeorm";

export class survey1615504729573 implements MigrationInterface {
    name = 'survey1615504729573'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `question` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `rightAnswerId` int NULL, UNIQUE INDEX `REL_1dc0fa732f12f98c74315976c5` (`rightAnswerId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `answer` (`id` int NOT NULL AUTO_INCREMENT, `content` varchar(255) NOT NULL, `questionId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `survey` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `userId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `survey_questions_question` (`surveyId` int NOT NULL, `questionId` int NOT NULL, INDEX `IDX_18d8af7d7653fb35e80194f770` (`surveyId`), INDEX `IDX_048347a6c2d3273e1d34a2015e` (`questionId`), PRIMARY KEY (`surveyId`, `questionId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `question` ADD CONSTRAINT `FK_1dc0fa732f12f98c74315976c5b` FOREIGN KEY (`rightAnswerId`) REFERENCES `answer`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `answer` ADD CONSTRAINT `FK_a4013f10cd6924793fbd5f0d637` FOREIGN KEY (`questionId`) REFERENCES `question`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `survey` ADD CONSTRAINT `FK_5963e1aea20c3c7c2108849c08a` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `survey_questions_question` ADD CONSTRAINT `FK_18d8af7d7653fb35e80194f770c` FOREIGN KEY (`surveyId`) REFERENCES `survey`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `survey_questions_question` ADD CONSTRAINT `FK_048347a6c2d3273e1d34a2015e4` FOREIGN KEY (`questionId`) REFERENCES `question`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `survey_questions_question` DROP FOREIGN KEY `FK_048347a6c2d3273e1d34a2015e4`");
        await queryRunner.query("ALTER TABLE `survey_questions_question` DROP FOREIGN KEY `FK_18d8af7d7653fb35e80194f770c`");
        await queryRunner.query("ALTER TABLE `survey` DROP FOREIGN KEY `FK_5963e1aea20c3c7c2108849c08a`");
        await queryRunner.query("ALTER TABLE `answer` DROP FOREIGN KEY `FK_a4013f10cd6924793fbd5f0d637`");
        await queryRunner.query("ALTER TABLE `question` DROP FOREIGN KEY `FK_1dc0fa732f12f98c74315976c5b`");
        await queryRunner.query("DROP INDEX `IDX_048347a6c2d3273e1d34a2015e` ON `survey_questions_question`");
        await queryRunner.query("DROP INDEX `IDX_18d8af7d7653fb35e80194f770` ON `survey_questions_question`");
        await queryRunner.query("DROP TABLE `survey_questions_question`");
        await queryRunner.query("DROP TABLE `survey`");
        await queryRunner.query("DROP TABLE `user`");
        await queryRunner.query("DROP TABLE `answer`");
        await queryRunner.query("DROP INDEX `REL_1dc0fa732f12f98c74315976c5` ON `question`");
        await queryRunner.query("DROP TABLE `question`");
    }

}
