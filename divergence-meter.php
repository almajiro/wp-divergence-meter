<?php
/*
Plugin Name: Divergence Meter Widget
Plugin URI: http://www.almajiro.tokyo
Description: el psy congroo.
Version: 1.0b
Author: Kuroki Almajiro
Author URI: http://www.almajiro.tokyo
Licence: Future Gadget Lab
*/

class Divergence_Meter_Widget extends WP_Widget{
	function __construct()
	{
		parent::__construct(
			'divergence_meter',
			'Divergence Meter',
			array('description' => 'display the divergence')
		);
	}

	public function widget($args, $instance)
	{
		echo '<section id="divergence_meter" class="widget"><h2 class="widget-title">Divergence Meter</h2>';
		echo '<canvas id="divergence_meter_cv" width="400" height="135"></canvas>';
		echo '<script src="'. plugins_url() . "/wp-divergence-meter/assets/js/divergence_meter.js". '"></script>';
		echo '</section>';
	}

	public function form($instance)
	{
		echo '<br><b>Open the Steins;Gate.</b><br>';
	}

	public function update($new_instance, $old_instance)
	{
		return $new_instance;
	}
}


add_action('widgets_init', function()
{
	register_widget('Divergence_Meter_Widget');	
});
?>
