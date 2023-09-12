CREATE TABLE `Company` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`headquarters_location` text,
	`industry` text
);
--> statement-breakpoint
CREATE TABLE `Employee` (
	`id` integer PRIMARY KEY NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`email` text NOT NULL,
	`phone_number` text,
	`hire_date` text NOT NULL,
	`job_title` text,
	`salary` integer,
	`company_id` integer NOT NULL,
	FOREIGN KEY (`company_id`) REFERENCES `Company`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `Employee_email_unique` ON `Employee` (`email`);