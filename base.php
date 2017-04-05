<?php get_template_part('templates/head'); ?>
<body <?php body_class(); ?>>

  <?php do_action('get_header');
  get_template_part('templates/header'); ?>

  <div class="wrap" role="document">

      <div class="main" role="main">
        <?php include roots_template_path(); ?>
      </div><!-- /.main -->

      <?php if (roots_display_sidebar()) : ?>
      <aside class="sidebar <?php echo roots_sidebar_class(); ?>" role="complementary">
        <?php include roots_sidebar_path(); ?>
      </aside><!-- /.sidebar -->
      <?php endif; ?>

  </div><!-- /.wrap -->

  <?php get_template_part('templates/footer'); ?>

   <!-- Google Maps -->
   <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&amp;key=AIzaSyANE6s8C1oj696ydpdPzWVtWAEMoMVi0p8"></script>

  <?php wp_footer(); ?>
</body>
</html>
